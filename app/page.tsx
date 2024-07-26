/*import { ByteChatBot } from "@/components/component/byte-chat-bot";
import Image from "next/image";

export default function Home() {
  return <ByteChatBot />
}
*/

// pages/index.js
'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const personas = [
    '[Internship Advisor AI] ',
    '[Marketing Analyst AI]',
    '[Legal Consultant AI]',
    '[Human Resource Manager AI]',
    '[Admin Assistant AI]',
    '[Teacher AI]'
  ];
  //const router = useRouter();

  //const handlePersonaSelect = (id: number) => {
  //  router.push(`/chat?id=${id}`);
  //};

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', padding: '10px' }}>Select a Persona</h1>
      {personas.map((persona, index) => (
        <Link key={index} href={`/chat/${index}`}>
          <button style={{ padding: '10px', backgroundColor: '#38B6FF', color: 'black', borderRadius: '5px', margin: '5px' }}>{persona}</button><br />
        </Link>
      ))}
    </div>
  );
}