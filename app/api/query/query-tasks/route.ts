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
      SELECT chatbot_id, persona_id, task, subpersona, default_prompt FROM chatbot WHERE persona_id = ${persona_id};
    `;

    console.log("RESULT: ");
    console.log(result);
    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}