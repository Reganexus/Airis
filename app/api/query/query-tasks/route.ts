import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { persona_id } = await request.json(); 
    // Parse the JSON body to get persona_id

    // Ensure persona_id is provided
    if (!persona_id) {
      return NextResponse.json({ error: 'persona_id is required' }, { status: 400 });
    }

    // Execute the SQL query using the provided persona_id
    const result = await sql`
      SELECT c.chatbot_id, c.persona_id, p.name AS persona_name, c.role, c.task, c.subpersona, c.default_prompt, c.svg_icon
      FROM chatbot c 
      INNER JOIN persona p ON p.persona_id = c.persona_id  WHERE c.persona_id = ${persona_id} order by subpersona;
    `;
    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}