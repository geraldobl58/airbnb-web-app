"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="Avatar"
      width="30"
      height="30"
      src={src || "/images/placeholder.jpeg"}
      className="rounded-full"
    />
  );
};

export default Avatar;
