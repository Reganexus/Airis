import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db, sql } from '@vercel/postgres';

export async function POST(request: Request) {
    const client = await db.connect();
  try {
    const { fname, lname, username, email, password, password2 } = await request.json();
    let errors = [];
    // Validate inputs

    // Validating firstname
    if (!fname) {
        errors.push("First name is required.");
    } else if (fname.length > 50) {
        errors.push("First name cannot be longer than 50 characters.");
    }

    // Validating lastname
    if (!lname) {
        errors.push("Last name is required.");
    } else if (lname.length > 50) {
        errors.push("Last name cannot be longer than 50 characters.");
    }

    // Validating username 
    const existing_usernames = await client.sql`SELECT COUNT(*) AS count FROM users WHERE username = ${username};`;
    const username_is_unique =  existing_usernames.rows[0].count == 0;
    if(!username_is_unique){
        errors.push("Username is already taken.");
    } else if (username.length < 3 || username.length > 30) {
        errors.push("Username must be between 3 and 30 characters.");
    } else if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, underscores, and periods.");
    }
    // Validating email
    const existing_emails = await client.sql`SELECT COUNT(*) AS count FROM users WHERE email = ${email};`;
    const email_is_unique =  existing_emails.rows[0].count == 0;
    if(!email_is_unique){
        errors.push("Email is already used.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Email is invalid.");
    }


    // Validating password
    if(!password2){
        errors.push("Please confirm your password.");
    } else if(password != password2){
        errors.push('Passwords do not match. Please try again.');
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    } else if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    } else if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number.");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }

    if(errors.length == 0){
        console.log({ email, password });

        const hashedPassword = await hash(password, 10);
    
        const response = await client.sql`
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