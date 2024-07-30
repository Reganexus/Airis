import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const formData = new URLSearchParams(await req.text());
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(username);
    console.log(email);
    console.log(password);

    // Validate the data (basic validation example)
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Insert the data into the USERS table
    const result = await sql`
      INSERT INTO Users (
        firstname, 
        lastname, 
        username, 
        email, 
        subscription_level, 
        password, 
        admin
        ) VALUES (
        'John', 
        'Doe', 
        ${username}, 
        ${email}, 
        'basic', 
        ${password}, 
        false
        );`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
