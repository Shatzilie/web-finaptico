-- Drop the insecure view
DROP VIEW IF EXISTS public.v_contact_consents_audit;

-- Create a secure replacement view with RLS-like behavior
-- Since views can't have RLS, we make it return no data for non-admins
CREATE VIEW public.v_contact_consents_audit AS
SELECT 
    CASE WHEN public.is_admin() THEN cm.id ELSE NULL END AS contact_id,
    CASE WHEN public.is_admin() THEN cm.created_at ELSE NULL END AS contact_created_at,
    CASE WHEN public.is_admin() THEN cm.name ELSE NULL END AS name,
    CASE WHEN public.is_admin() THEN cm.email ELSE NULL END AS email,
    CASE WHEN public.is_admin() THEN cm.message ELSE NULL END AS message,
    CASE WHEN public.is_admin() THEN cm.privacy_accepted ELSE NULL END AS privacy_accepted,
    CASE WHEN public.is_admin() THEN cm.consent_id ELSE NULL END AS consent_id,
    CASE WHEN public.is_admin() THEN c.created_at ELSE NULL END AS consent_created_at,
    CASE WHEN public.is_admin() THEN c.source ELSE NULL END AS source,
    CASE WHEN public.is_admin() THEN c.policy_version ELSE NULL END AS policy_version,
    CASE WHEN public.is_admin() THEN c.policy_url ELSE NULL END AS policy_url,
    CASE WHEN public.is_admin() THEN c.policy_text_b64 ELSE NULL END AS policy_text_b64,
    CASE WHEN public.is_admin() THEN c.policy_text_hash ELSE NULL END AS policy_text_hash,
    CASE WHEN public.is_admin() THEN c.granted ELSE NULL END AS granted,
    CASE WHEN public.is_admin() THEN c.ip ELSE NULL END AS ip,
    CASE WHEN public.is_admin() THEN c.user_agent ELSE NULL END AS user_agent,
    CASE WHEN public.is_admin() THEN c.origin ELSE NULL END AS origin,
    CASE WHEN public.is_admin() THEN c.referer ELSE NULL END AS referer
FROM contact_messages cm
LEFT JOIN consents c ON (c.id = cm.consent_id)
WHERE public.is_admin(); -- Only return rows if user is admin