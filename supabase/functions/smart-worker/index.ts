import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Saving to database...');
    
    // Save to database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: name,
        email: email,
        message: message
      }])
      .select();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: 'Failed to save message: ' + error.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const savedMessage = data[0];
    console.log('Message saved successfully:', savedMessage);

    return new Response(
      JSON.stringify({ 
        ok: true, 
        id: savedMessage.id,
        message: 'Message received and saved successfully'
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