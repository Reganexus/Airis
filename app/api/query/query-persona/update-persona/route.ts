import { NextResponse } from 'next/server';
import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    
    const personaInformation = await req.json()
    
    // Update the existing persona data as user requested
    const result = await client.sql`
    UPDATE personas
        SET name = ${personaInformation.name}, 
            department = ${personaInformation.department}, 
            tagline = ${personaInformation.tagline}, 
            logo_name = ${personaInformation.logo_name}, 
            bg_name = ${personaInformation.bg_name}, 
            persona_link = ${personaInformation.persona_link}
        WHERE persona_id = ${personaInformation.persona_id};`;

    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}
