// components/RecordCard.tsx

import Image from "next/image";
import { toSnake } from "@/utils/stringUtils";

interface Monster {
  count: string;
  name: string;
}

interface Session {
  id: string;
  balance: string;
  damage: string;
  damage_per_hour: string;
  healing: string;
  healing_per_hour: string;
  loot: string;
  raw_xp_gain: string;
  raw_xp_per_hour: string;
  xp_gain: string;
  xp_per_hour: string;
  supplies: string;
  session_start: string;
  session_end: string;
  session_length: string;
  killed_monsters?: Monster[];
  looted_items?: Monster[];
}

interface RecordCardProps {
  session: Session;
  showDetails?: boolean;
}

export default function RecordCard({
  session,
  showDetails = false,
}: RecordCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Session {session.id.slice(0, 8)}
        </h3>
        <span className="text-sm text-gray-500">{session.session_start}</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600 uppercase">Balance</p>
          <p className="font-mono text-green-500">{session.balance}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Damage/h</p>
          <p className="font-mono text-gray-800">{session.damage_per_hour}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">XP/h</p>
          <p className="font-mono text-yellow-400">{session.xp_per_hour}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Loot</p>
          <p className="font-mono text-gray-800">{session.loot}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Supplies</p>
          <p className="font-mono text-gray-800">{session.supplies}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Duration</p>
          <p className="font-mono text-gray-800">{session.session_length}</p>
        </div>
      </div>

      {/* Details Sections */}
      {showDetails && (
        <div className="space-y-4 text-black">
          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">
              Killed Monsters ({session.killed_monsters?.length ?? 0})
            </summary>
            <ul className="mt-2 max-h-32 overflow-auto list-none p-0">
              {session.killed_monsters?.map((m, i) => {
                const filename = toSnake(m.name) + ".gif";
                return (
                  <li key={i} className="flex items-center space-x-2 mb-1">
                    <Image
                      src={`/imagensTibia/${filename}`}
                      alt={m.name}
                      width={24}
                      height={24}
                    />
                    <span className="text-sm">
                      {m.name}: {m.count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">
              Looted Items ({session.looted_items?.length ?? 0})
            </summary>
            <ul className="mt-2 max-h-32 overflow-auto list-none p-0">
              {session.looted_items?.map((i, idx) => {
                return (
                  <li key={idx} className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">
                      {i.name}: {i.count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
