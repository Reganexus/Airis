// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  const session = await getServerSession();

  if (session) {
    return NextResponse.json({ email: session.user?.email, username: session.user?.name, image: session.user?.image });
  } else {
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }
}
