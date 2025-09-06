-- Allow the edge function service role to insert contact messages and consents
-- Update contact messages policies to allow service role insertion
DROP POLICY IF EXISTS "Only admins can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can insert consents" ON public.consents;

-- Contact Messages: Allow service role to insert (for contact form), only admins can view/update/delete
CREATE POLICY "Service role can insert contact messages"
ON public.contact_messages
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Consents: Allow service role to insert (for consent tracking), only admins can view/update/delete  
CREATE POLICY "Service role can insert consents"
ON public.consents
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Only admins can view consents"
ON public.consents
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update consents"
ON public.consents
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete consents"
ON public.consents
FOR DELETE
TO authenticated
USING (public.is_admin());