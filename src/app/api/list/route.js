// Note: This endpoint is not being used, this is just an example of a Route Handler.
// (NextJS API routes with the new App Router)

import { supabase } from '../../lib/supabase'

export async function GET() {
  try {
    let { data, error } = await supabase
      .from('diary_entries')
      .select('*');

    if (error) {
      throw new Error('Failed to fetch data');
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
