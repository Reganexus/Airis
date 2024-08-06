import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  logoSize?: number;
  textSize?: string;
}

const Logo: React.FC<LogoProps> = ({
  logoSize = 50,
  textSize = "text-4xl",
}) => {
  return (
    <Link href="/landing">
      <div className="z-20 flex items-center justify-center gap-1">
        <div>
          <Image
            src="/logo/airis_logo_sq_trans.png"
            alt="airis logo"
            width={logoSize}
            height={logoSize}
          />
        </div>
        <div className="flex items-center justify-center pt-1">
          <h1 className={`font-zain ${textSize} text-primary font-medium`}>
            airis
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
