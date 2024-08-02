'use client';
import Link from "next/link";
import SideBar from "./main/side-bar";
import PersonaSelection from "./main/persona-selection";
import PromptSelection from "./main/prompt-selection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push('/intern-profile');
  router.refresh();
  return null;
}
