import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Smart worker function called with method:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Received body:', body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: 'Missing required fields: name, email, message' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate a unique ID for this message
    const id = crypto.randomUUID();
    
    console.log('Generated message ID:', id);
    console.log('Message data:', { name, email, message });

    // Here you would typically save to database, send email, etc.
    // For now, we'll just return success with the ID

    return new Response(
      JSON.stringify({ 
        ok: true, 
        id: id,
        message: 'Message received successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in smart-worker function:', error);
    return new Response(
      JSON.stringify({ 
        ok: false, 
        error: 'Internal server error: ' + error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});