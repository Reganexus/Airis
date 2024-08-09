'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();

  // temporary
  router.push('/persona');
  router.refresh();
  return null;

}
