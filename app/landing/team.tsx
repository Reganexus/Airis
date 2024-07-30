import Link from "next/link";
import React, { FC } from "react";

const Team: FC = () => {
  return (
    <section className="bg-plus bg-cover min-h-[50rem] flex flex-col items-center">
      <div className="bg-white w-full text-center py-16">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">
          Meet the Team
        </h2>
        <p className="text-xl max-w-[1000px] m-auto text-slate-600">
          At Airis, we believe that our people are our greatest asset. Our
          diverse and dynamic team is dedicated to driving innovation and
          delivering exceptional results. Get to know the faces behind our
          success:
        </p>
      </div>
      <Carousel />
      <CTA />
    </section>
  );
};

const Carousel: FC = () => {
  return <div className="">Carou</div>;
};

const CTA: FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-500 shadow-lg max-w-[1000px] m-auto px-4 py-8">
      <h2 className="text-4xl text-center text-slate-800 font-bold mb-4 mt-4">
        Elevate your Business with Airis!
      </h2>

      <p className="text-xl text-center text-slate-600 px-8">
        Unlock the full potential of your business with our state-of-the-art AI
        chatbot. Imagine a world where customer queries are handled instantly,
        leads are generated effortlessly, and your team is free to focus on what
        they do best.
      </p>

      <p className="text-xl text-center text-slate-600 mt-4 px-8">
        Join the revolution and watch your business thrive!
      </p>

      <div className="flex justify-center mt-8 mb-4">
        <Link
          href="#"
          className="text-xl bg-primary hover:bg-sky-700 text-white px-8 py-2 rounded-lg"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Team;
