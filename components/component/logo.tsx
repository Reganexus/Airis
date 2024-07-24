import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="flex item-center justify-center gap-1">
      <Image
        src="/airis_logo_sq_trans.png"
        alt="airis logo"
        width={50}
        height={50}
      />
      <div className="flex items-center justify-center">
        <h1 className="font-zain text-4xl text-primary font-medium">airis</h1>
      </div>
    </div>
  );
};

export default Logo;
