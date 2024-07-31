import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { fname, lname, username, email, password, password2 } = await request.json();
    let errors = [];
    // Validate email and password

    if(password != password2){
        errors.push('Passwords do not match. Please try again.');
    }

    if(errors.length == 0){
        console.log({ email, password });

        const hashedPassword = await hash(password, 10);
    
        const response = await sql`
          INSERT INTO users (firstname, lastname, username, email, password)
          VALUES (${fname}, ${lname}, ${username}, ${email}, ${hashedPassword})
        `;
    }

    else{
        return NextResponse.json({ message: 'failed', errors: errors}, {status: 400});
    }

    return NextResponse.json({ message: 'success' });
  } catch (e) {
        console.log({ e });
        if (e instanceof Error) {
            return NextResponse.json({ message: 'error', error: e.message }, { status: 500 });
        } 
        else {
            return NextResponse.json({ message: 'error', error: 'An unknown error occurred' }, { status: 500 });
        }  
    }
}