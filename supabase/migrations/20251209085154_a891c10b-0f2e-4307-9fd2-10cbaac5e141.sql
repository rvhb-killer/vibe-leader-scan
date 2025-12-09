-- Create responses table for storing anonymous VIBE survey responses
CREATE TABLE public.responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_hash TEXT NOT NULL,
  team TEXT,
  role TEXT NOT NULL CHECK (role IN ('employee', 'manager')),
  answers JSONB NOT NULL,
  manager_expectations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert responses (anonymous survey)
CREATE POLICY "Anyone can insert responses"
ON public.responses
FOR INSERT
WITH CHECK (true);

-- Allow reading aggregated data only (no individual responses visible)
-- We'll use a function for aggregated results instead of direct access
CREATE POLICY "No direct read access to individual responses"
ON public.responses
FOR SELECT
USING (false);

-- Create function to get aggregated team results (only if n >= 4)
CREATE OR REPLACE FUNCTION public.get_team_results(p_company_hash TEXT, p_team TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  employee_count INTEGER;
  manager_count INTEGER;
  result JSONB;
BEGIN
  -- Count employees
  SELECT COUNT(*) INTO employee_count
  FROM responses
  WHERE company_hash = p_company_hash
    AND (p_team IS NULL OR team = p_team)
    AND role = 'employee';
  
  -- Count managers
  SELECT COUNT(*) INTO manager_count
  FROM responses
  WHERE company_hash = p_company_hash
    AND (p_team IS NULL OR team = p_team)
    AND role = 'manager';
  
  -- Privacy threshold: need at least 4 employees
  IF employee_count < 4 THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Onvoldoende medewerkers voor anonieme resultaten (minimaal 4 nodig)',
      'employeeCount', employee_count,
      'managerCount', manager_count
    );
  END IF;
  
  -- Build aggregated result
  SELECT jsonb_build_object(
    'success', true,
    'employeeCount', employee_count,
    'managerCount', manager_count,
    'employeeAnswers', (
      SELECT jsonb_agg(answers)
      FROM responses
      WHERE company_hash = p_company_hash
        AND (p_team IS NULL OR team = p_team)
        AND role = 'employee'
    ),
    'managerExpectations', (
      SELECT jsonb_agg(manager_expectations)
      FROM responses
      WHERE company_hash = p_company_hash
        AND (p_team IS NULL OR team = p_team)
        AND role = 'manager'
        AND manager_expectations IS NOT NULL
    )
  ) INTO result;
  
  RETURN result;
END;
$$;