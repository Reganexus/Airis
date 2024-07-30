import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const formData = new URLSearchParams(await req.text());

    const username = formData.get('username');
    const firstname = formData.get('username');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(username);
    console.log(email);
    console.log(password);

    const schema = z.object({ 
      username: z.string().min(1),  // not empty
      firstname: z.string().min(1), // not empty
      lastname: z.string().min(1),  // not empty
      email: z.string().email(),    //  email
      password: z.string().min(8),  // atleast 8 chars
    });
    const parse = schema.safeParse({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
  
    if (!parse.success) {
      return NextResponse.json({ error: 'Failed validation' }, { status: 400 });
    }
  
    const data = parse.data;
  
    // Validate the data (basic validation example)
    // if (!username || !email || !password) {
    //   return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    // }

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
        ${data.firstname}, 
        ${data.lastname}, 
        ${data.username}, 
        ${data.email}, 
        'basic', 
        ${data.password}, 
        false
        );`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
