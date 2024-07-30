import React, { FC } from "react";

const Pricing: FC = () => {
  return (
    <section className="bg-pricing h-[65rem] bg-cover">
      <div className="text-white text-center py-20 max-w-[1000px] m-auto">
        <h2 className="text-3xl mb-8 font-medium">Pricing</h2>
        <p className="text-xl">
          At Airis, we offer flexible pricing plans tailored to fit the needs of
          businesses of all sizes. Whether you&apos;re a startup or a large
          enterprise, we have a solution that will work for you.
        </p>
      </div>

      {/* pricing tiers */}
      <div className="w-full flex justify-center items-center gap-8">
        {/* Free Tier */}
        <div className="w-[20rem] bg-slate-100 rounded-lg h-[33rem] p-4 flex flex-col">
          <h2 className="text-center text-2xl font-semibold pt-2">Free</h2>

          <h3 className="text-center text-xl py-4">&#8369;0.00</h3>

          <p className="text-center px-6">
            Unlock a powerful set of features and support designed to elevate
            your business, offering the best value and flexibility for growing
            operations.
          </p>

          <div className="py-6">
            <h4 className="font-medium">Features</h4>
            <ul className="list-disc pl-6">
              <li>Basic chatbot interactions</li>
              <li>Limited document creation</li>
              <li>Basic DALL-E usage</li>
              <li>Limited API calls</li>
            </ul>
          </div>

          <button className="mt-auto py-4 border rounded-lg border-slate-900">
            Free
          </button>
        </div>

        {/* Plus tier */}
        <div className="w-[22rem] bg-plus bg-cover rounded-lg h-[36rem] p-4 flex flex-col text-white relative overflow-clip border border-slate-500">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
          <h2 className="text-center text-2xl font-semibold pt-4 z-10">Plus</h2>

          <h3 className="text-center text-3xl py-4 z-10">&#8369;1,500.00</h3>

          <p className="text-center px-6 z-10">
            Unlock a powerful set of features and support designed to elevate
            your business, offering the best value and flexibility for growing
            operations.
          </p>

          <div className="py-6 z-10">
            <h4 className="font-medium">Features</h4>
            <ul className="list-disc pl-6">
              <li>Unlimited chatbot interactions</li>
              <li>Access to core document creation tools</li>
              <li>Enhanced DALL-E capabilities</li>
              <li>Shared up to 2 users</li>
            </ul>
          </div>

          <button className="z-10 text-xl mt-auto py-4 border-2 rounded-lg border-white">
            Purchase
          </button>
        </div>

        {/* Premium Tier */}
        <div className="w-[20rem] bg-premium bg-cover rounded-lg h-[33rem] p-4 flex flex-col relative overflow-clip text-white border border-slate-500">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
          <h2 className="text-center text-2xl font-semibold pt-4 z-10">
            Premium
          </h2>

          <h3 className="text-center text-3xl py-4 z-10">&#8369;3,000.00</h3>

          <p className="text-center px-6 z-10">
            Experience top-tier features and comprehensive support with
            unlimited access, ideal for large-scale needs but at a higher cost.
          </p>

          <div className="py-6 z-10">
            <h4 className="font-medium">Features</h4>
            <ul className="list-disc pl-6">
              <li>Unlimited chatbot interactions</li>
              <li>Access to core document creation tools</li>
              <li>Custom integrations and enterprise-level security</li>
              <li>Shared up to 5 users</li>
            </ul>
          </div>

          <button className="z-10 text-xl mt-auto py-4 border-2 rounded-lg border-white">
            Purchase
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
