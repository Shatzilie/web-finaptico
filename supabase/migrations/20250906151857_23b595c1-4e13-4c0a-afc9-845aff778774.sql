-- Enable RLS on the audit view to protect sensitive customer data
ALTER VIEW public.v_contact_consents_audit SET (security_barrier = true);

-- Note: Views in PostgreSQL don't support RLS policies directly like tables do.
-- We need to secure the underlying tables (which we already did) and optionally
-- create a security definer function to control access to the view.

-- Create a secure function to access the audit view data
CREATE OR REPLACE FUNCTION public.get_contact_consents_audit()
RETURNS TABLE (
    contact_id uuid,
    contact_created_at timestamp with time zone,
    name text,
    email text,
    message text,
    privacy_accepted boolean,
    consent_id uuid,
    consent_created_at timestamp with time zone,
    granted boolean,
    source text,
    policy_version text,
    policy_url text,
    policy_text_hash text,
    policy_text_b64 text,
    origin text,
    referer text,
    user_agent text,
    ip inet
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only allow access if the user is an admin
  SELECT 
    v.contact_id,
    v.contact_created_at,
    v.name,
    v.email,
    v.message,
    v.privacy_accepted,
    v.consent_id,
    v.consent_created_at,
    v.granted,
    v.source,
    v.policy_version,
    v.policy_url,
    v.policy_text_hash,
    v.policy_text_b64,
    v.origin,
    v.referer,
    v.user_agent,
    v.ip
  FROM public.v_contact_consents_audit v
  WHERE public.is_admin();
$$;

-- Revoke public access to the view
REVOKE ALL ON public.v_contact_consents_audit FROM PUBLIC;
REVOKE ALL ON public.v_contact_consents_audit FROM anon;
REVOKE ALL ON public.v_contact_consents_audit FROM authenticated;

-- Grant access only to service_role (for admin operations)
GRANT SELECT ON public.v_contact_consents_audit TO service_role;

-- Create a policy on the view (though this may not work on all PostgreSQL versions)
-- This is an additional security measure
DO $$
BEGIN
    -- Try to enable RLS on the view if supported
    BEGIN
        EXECUTE 'ALTER VIEW public.v_contact_consents_audit ENABLE ROW LEVEL SECURITY';
    EXCEPTION WHEN OTHERS THEN
        -- Views don't support RLS in all PostgreSQL versions, that's ok
        NULL;
    END;
END $$;