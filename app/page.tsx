import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="m-12 text-5xl">Persona Selection Page</h1>
      <Link
        href="/chat"
        className="bg-primary text-white px-8 py-4 rounded-lg text-2xl mb-2"
      >
        To Main Chat Page
      </Link>
      <Link
        href="/landing"
        className="bg-primary text-white px-8 py-4 rounded-lg text-2xl"
      >
        To Landing Page
      </Link>
    </main>
  );
}
