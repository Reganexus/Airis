import Image from "next/image";
import Link from "next/link";

export default function NotFoundAgent() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col dark:bg-dark-mode dark:text-slate-200">
      <Image
        src={"/img/notfound_cyan.png"}
        alt="picture of not found illustration"
        height={200}
        width={200}
        className="mb-2"
      />
      <h2 className="text-5xl font-bold mb-1">Persona Not Found</h2>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
        Could not find the requested resource.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Link
          href="/"
          className="py-2 px-6 border border-slate-400 rounded-lg dark:border-slate-500 hover:bg-slate-100  dark:hover:bg-slate-800"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
