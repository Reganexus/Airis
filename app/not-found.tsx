import Link from "next/link";
import Header from "./landing/header";
import Footer from "./landing/footer";
import Logo from "@/components/component/logo";

const NotFoundPage = () => {
  return (
    <main className="relative flex flex-col h-screen">
      <header className="z-20 sticky inset-0 shadow flex justify-between items-center h-[4rem] border-b border-slate-300 px-4 bg-white">
        <Logo />

        <div className="flex items-align gap-4 py-3 z-20">
          <Link
            href={{ pathname: "/entry", query: { type: "register" } }}
            className="bg-none border border-slate-700 rounded-lg px-4 p-2 hover:bg-slate-200 flex items-center"
          >
            Sign Up
          </Link>
          <Link
            href="/entry"
            className="bg-primary hover:bg-sky-700 text-white rounded-lg px-4 flex items-center "
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="relative bg-cover bg-center bg-main-gradient flex flex-col justify-center items-center h-full">
        <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

        <div className="mb-8 z-10 max-w-[1200px] mx-auto px-6 text-center text-white">
          <h1 className="text-center md:text-[6rem] sm:text-5xl text-6xl font-bold mb-2">
            404
          </h1>
          <h2 className="text-2xl mb-8">Page not found</h2>

          <h3 className="sm:text-xl">The requested page could not be found.</h3>
          <h3 className="sm:text-xl">
            Perhaps you we&apos;re looking for something else?
          </h3>
        </div>

        <div className="z-10 flex flex-wrap justify-center gap-4 py-3 px-4">
          <Link
            href="/landing"
            className="sm:text-2xl px-4 py-2 text-white border-2 border-white rounded-lg flex items-center hover:bg-white hover:text-slate-700"
          >
            Return to Landing Page
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFoundPage;
