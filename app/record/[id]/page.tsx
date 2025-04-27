import RecordCard from "@/components/RecordCard";
import { supabase } from "../../../services/supabase";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function RecordPage({ params }: Props) {
  const { id } = params;

  const { data: session, error } = await supabase
    .from("sessions")
    .select(
      `
      *,
      killed_monsters (
        count,
        name
      ),
      looted_items (
        count,
        name
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div className="text-red-600">Error loading session: {error.message}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard">
        <span className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </span>
      </Link>

      <RecordCard session={session!} showDetails />
    </div>
  );
}
