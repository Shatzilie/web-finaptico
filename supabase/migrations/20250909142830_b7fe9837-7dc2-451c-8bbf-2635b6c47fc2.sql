-- Enable Row Level Security on the v_contact_consents_audit view
ALTER TABLE public.v_contact_consents_audit ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to restrict view access to admin users only
CREATE POLICY "Only admins can view contact consents audit"
ON public.v_contact_consents_audit
FOR SELECT
USING (public.is_admin());

-- Create RLS policies for other operations (though views typically only support SELECT)
CREATE POLICY "Only admins can insert into contact consents audit"
ON public.v_contact_consents_audit
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update contact consents audit"
ON public.v_contact_consents_audit
FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Only admins can delete from contact consents audit"
ON public.v_contact_consents_audit
FOR DELETE
USING (public.is_admin());