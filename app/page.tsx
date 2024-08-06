'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();

  // temporary
  router.push('/persona/intern-ai-agent');
  router.refresh();
  return null;

}
