// app/dashboard/page.tsx

import RecordCard from "@/components/RecordCard";
import { supabase } from "../../services/supabase";
import Link from "next/link";

export default async function DashboardPage() {
  const { data: sessions, error } = await supabase
    .from("sessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-red-600">
        Error loading sessions: {error.message}
      </div>
    );
  }

  // Calculate total balance
  const totalBalance =
    sessions?.reduce((sum, session) => {
      const num = parseInt(session.balance.replace(/,/g, ""), 10) || 0;
      return sum + num;
    }, 0) ?? 0;
  const formattedBalance = totalBalance.toLocaleString("en-US");

  return (
    <>
      <div className="flex justify-center m-6">
        <Link href="/create" className="text-white font-medium">
          Add New Session
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Link key={session.id} href={`/record/${session.id}`}>
              <RecordCard session={session} />
            </Link>
          ))}
        </div>
      </div>

      <footer className="mt-8 text-center text-green-600">
        Total Balance: <span className="font-semibold">{formattedBalance}</span>
      </footer>
    </>
  );
}
