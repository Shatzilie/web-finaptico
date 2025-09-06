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

    const { name, email, message, privacy, policyVersion, policyUrl, policyText } = body;

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

    if (!privacy) {
      console.log('Privacy consent not provided');
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: 'Privacy consent is required' 
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
    
    // Generate consent ID for this submission
    const consentId = crypto.randomUUID();
    
    // First, create the consent record
    const { data: consentData, error: consentError } = await supabase
      .from('consents')
      .insert([{
        id: consentId,
        granted: privacy,
        source: 'contact_form',
        policy_version: policyVersion,
        policy_url: policyUrl,
        policy_text_hash: policyText ? btoa(policyText) : null,
        origin: req.headers.get('origin') || null,
        referer: req.headers.get('referer') || null,
        user_agent: req.headers.get('user-agent') || null
      }])
      .select();

    if (consentError) {
      console.error('Consent creation error:', consentError);
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: 'Failed to record consent: ' + consentError.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Now save contact message with privacy acceptance
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: name,
        email: email,
        message: message,
        privacy_accepted: privacy,
        consent_id: consentId
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

    // Log the consent for compliance
    console.log(`Privacy consent recorded - Contact ID: ${savedMessage.id}, Consent ID: ${consentId}, Policy Version: ${policyVersion}`);

    return new Response(
      JSON.stringify({ 
        ok: true, 
        id: savedMessage.id,
        saved: 'contact',
        consent_id: consentId,
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