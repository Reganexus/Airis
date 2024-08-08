import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const info = await request.json()
    if (info.persona_link)  {
      // Execute the SQL query using the provided persona_link
      const result = await sql`
      SELECT *
      FROM persona 
      WHERE persona_link = ${info.persona_link};
      `;
      
      // Return the result as JSON
      return NextResponse.json(result.rows);
    } else if  (info.persona_name) {
      // Otherwise, execute the SQL query using the provided persona_name

      const result = await sql`
          SELECT persona_id, name, department
          FROM persona 
          WHERE persona_name = ${info.persona_name};
      `;
      
      // Return the result as JSON
      return NextResponse.json(result.rows);
    }


  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}