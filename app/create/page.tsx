/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePage() {
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const parsed = JSON.parse(payload);

      // 1) Insert session and get its ID
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .insert([
          {
            balance: parsed["Balance"],
            damage: parsed["Damage"],
            damage_per_hour: parsed["Damage/h"],
            healing: parsed["Healing"],
            healing_per_hour: parsed["Healing/h"],
            loot: parsed["Loot"],
            raw_xp_gain: parsed["Raw XP Gain"],
            raw_xp_per_hour: parsed["Raw XP/h"],
            xp_gain: parsed["XP Gain"],
            xp_per_hour: parsed["XP/h"],
            supplies: parsed["Supplies"],
            session_start: parsed["Session start"],
            session_end: parsed["Session end"],
            session_length: parsed["Session length"],
          },
        ])
        .select("id")
        .single();

      if (sessionError || !sessionData) {
        throw sessionError || new Error("Failed to create session");
      }
      const sessionId = sessionData.id;

      // 2) Insert killed_monsters
      const killed = (parsed["Killed Monsters"] || []).map((m: any) => ({
        session_id: sessionId,
        count: String(m.Count),
        name: m.Name,
      }));
      if (killed.length) {
        const { error: kmError } = await supabase
          .from("killed_monsters")
          .insert(killed);
        if (kmError) throw kmError;
      }

      // 3) Insert looted_items
      const looted = (parsed["Looted Items"] || []).map((i: any) => ({
        session_id: sessionId,
        count: String(i.Count),
        name: i.Name,
      }));
      if (looted.length) {
        const { error: liError } = await supabase
          .from("looted_items")
          .insert(looted);
        if (liError) throw liError;
      }

      // 4) Redirect only after all inserts succeed
      router.push("/dashboard");
    } catch (err) {
      console.error("Create error:", err);
      // Optionally show an error message here
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link href="/dashboard">
        <span className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </span>
      </Link>
      <main className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Create New Session</h1>

        <textarea
          className="w-full h-48 p-2 text-black font-mono border rounded mb-4"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Paste session JSON here"
        />

        <button
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </main>
    </>
  );
}
