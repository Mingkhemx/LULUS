import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sltdnrliuogojojbnexm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsdGRucmxpdW9nb2pvYmpuZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NDIxODQsImV4cCI6MjA5MjMxODE4NH0._SNglcdIK3PLBpVUcQ5hix68uz6rxcklko9voy7xcOM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
