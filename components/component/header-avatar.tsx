import React from "react";
import Image from "next/image";

const HeaderAvatar: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-md font-medium text-slate-800">Julia Harrison</h2>
      <div className="rounded-full overflow-hidden">
        <Image src="/user_placeholder_img.png" alt="" width={40} height={40} />
      </div>
    </div>
  );
};

export default HeaderAvatar;
