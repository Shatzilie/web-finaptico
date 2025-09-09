-- Drop the insecure view entirely
-- The secure function get_contact_consents_audit() already exists and should be used instead
DROP VIEW IF EXISTS public.v_contact_consents_audit;

-- Add a comment to document why the view was removed
-- The function get_contact_consents_audit() provides secure access to this data
COMMENT ON FUNCTION public.get_contact_consents_audit() IS 'Secure function to access contact consents audit data - only accessible to admin users. Replaces the insecure v_contact_consents_audit view.';