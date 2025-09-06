-- Drop all existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Only admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can delete contact messages" ON public.contact_messages;

DROP POLICY IF EXISTS "Only admins can view consents" ON public.consents;
DROP POLICY IF EXISTS "Only admins can insert consents" ON public.consents;
DROP POLICY IF EXISTS "Only admins can update consents" ON public.consents;
DROP POLICY IF EXISTS "Only admins can delete consents" ON public.consents;

-- Recreate policies for contact_messages with service role access for insertion
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

-- Recreate policies for consents with service role access for insertion
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