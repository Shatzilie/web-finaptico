-- Drop the current view that triggered the security warning
DROP VIEW IF EXISTS public.v_contact_consents_audit;

-- Create a simple view that returns empty results for non-admins
-- This approach avoids the SECURITY DEFINER warning
CREATE VIEW public.v_contact_consents_audit AS
SELECT 
    cm.id AS contact_id,
    cm.created_at AS contact_created_at,
    cm.name,
    cm.email,
    cm.message,
    cm.privacy_accepted,
    cm.consent_id,
    c.created_at AS consent_created_at,
    c.source,
    c.policy_version,
    c.policy_url,
    c.policy_text_b64,
    c.policy_text_hash,
    c.granted,
    c.ip,
    c.user_agent,
    c.origin,
    c.referer
FROM contact_messages cm
LEFT JOIN consents c ON (c.id = cm.consent_id)
WHERE public.is_admin(); -- Filter results to admin users only

-- Create a comment to document the security approach
COMMENT ON VIEW public.v_contact_consents_audit IS 'Audit view for contact consents - access restricted to admin users only via WHERE clause using is_admin() function';