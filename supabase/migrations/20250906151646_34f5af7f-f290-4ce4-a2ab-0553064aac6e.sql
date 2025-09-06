-- Enable RLS on all sensitive tables (if not already enabled)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erasure_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_logs ENABLE ROW LEVEL SECURITY;

-- Create user roles enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
    END IF;
END $$;

-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles without RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Contact Messages Policies - Only admins can access
CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert contact messages"
ON public.contact_messages
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

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

-- Consents Policies - Only admins can access
CREATE POLICY "Only admins can view consents"
ON public.consents
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert consents"
ON public.consents
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

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

-- Erasure Events Policies - Only admins can access
CREATE POLICY "Only admins can view erasure events"
ON public.erasure_events
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert erasure events"
ON public.erasure_events
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update erasure events"
ON public.erasure_events
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete erasure events"
ON public.erasure_events
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Worker Logs Policies - Only admins can access
CREATE POLICY "Only admins can view worker logs"
ON public.worker_logs
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert worker logs"
ON public.worker_logs
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update worker logs"
ON public.worker_logs
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete worker logs"
ON public.worker_logs
FOR DELETE
TO authenticated
USING (public.is_admin());

-- User Roles Policies - Users can view their own roles, only admins can manage roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Only admins can manage user roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update user roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete user roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin());