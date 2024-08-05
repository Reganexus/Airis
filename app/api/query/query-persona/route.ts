import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    
    // Execute the SQL query using the provided persona_id
    const result = await sql`
        SELECT * 
        FROM persona 
        ORDER BY persona_id;
    `;
    // Return the result as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}