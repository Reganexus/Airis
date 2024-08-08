import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    
    const personaInformation = await req.json()
    
    // Create a new persona
    const result = await sql`
    INSERT INTO personas (name, department, tagline, logo_name, bg_name, persona_link)
        VALUES (${personaInformation.name}, 
                ${personaInformation.department}, 
                ${personaInformation.tagline}, 
                ${personaInformation.logo_name}, 
                ${personaInformation.bg_name}, 
                ${personaInformation.persona_link})
        RETURNING persona_id`;

    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}
