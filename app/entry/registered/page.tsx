import Logo from "@/components/component/logo";
import Link from "next/link";

const RegisteredPage = () => {
  return (
    <main className="h-screen bg-entry flex justify-center items-center bg-no-repeat bg-cover">
      <div className="max-w-4xl m-auto bg-white p-8 dark:bg-slate-600 rounded-lg border dark:border-slate-500 text-center flex flex-col">
        <Logo logoSize={100} textSize="text-8xl" />
        <h1 className="my-6 text-slate-800 text-3xl text-center font-medium">
          Thank you for registering!
        </h1>
        <p className="text-center text-xl text-slate-600 px-8">
          You can now revolutionize your business with Airis! Start by exploring
          our specialized personas or setting up your own. With features like
          text and image generation, Airis is guaranteed to elevate your
          business to the next level.
        </p>

        <Link
          href={"/entry"}
          className="text-2xl py-2 border border-slate-600 self-center my-6 px-8 rounded-lg hover:bg-slate-100"
        >
          Sign in
        </Link>

        <p className="text-slate-500">
          © 2023 Smart Prodigy. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default RegisteredPage;
