import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest){
  try {
    // Use getSession to automatically handle fetching session based on the incoming request
    const session = await getServerSession();

    // Check if the session is valid and the user object is available
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: 'Authentication required' }));
    }

    const email = session.user?.email;
    const username = session.user?.name;

    if (!email || !username) {
      return new Response(JSON.stringify({ error: 'Email and Username Required' }));
    }

    console.log("Attempting to delete records for:", email, username);

    // Execute the SELECT operation to find the user ID
    const userQueryResult = await sql`SELECT user_id FROM users WHERE email = ${email} AND username = ${username}`;

    if (userQueryResult.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }));

    }

    const userId = userQueryResult.rows[0].user_id;
    console.log("USER ID: ", userId);

    // Execute the DELETE operation
    const deleteResult = await sql`DELETE FROM conversation WHERE user_id = ${userId}`;
    console.log("DELETE RESULT: ", deleteResult)

    if (deleteResult.rows.length == 0) {
      return new Response(JSON.stringify({ success: true, message: 'History deleted successfully' }));
    } else {
      return new Response(JSON.stringify({ success: true, message: 'No conversation history found for the user' }));
    }
    
  } catch (error) {
    console.error('Error deleting history:', error);
    return new Response(JSON.stringify({ success: true, message: 'Error deleting history' }));
  }
}
