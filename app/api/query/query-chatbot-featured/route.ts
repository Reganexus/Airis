
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    
    // Execute the SQL query using the provided persona_id
    const result = await sql`
        SELECT DISTINCT ON (p.persona_id) 
            p.persona_id, p.name, p.tagline, p.logo_name, c.chatbot_id, c.frequency, c.task
        FROM persona p
        JOIN chatbot c ON p.persona_id = c.persona_id
        ORDER BY p.persona_id, c.frequency DESC;
    `;
    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}