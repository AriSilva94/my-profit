import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Dashboard App</h1>
      <div className="space-x-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Dashboard
        </Link>
        <Link
          href="/create"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Session
        </Link>
      </div>
    </div>
  );
}
