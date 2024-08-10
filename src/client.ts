import { createClient } from "@supabase/supabase-js";

const URL = "https://lqpdqexkwglhsmjzcbht.supabase.co";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxcGRxZXhrd2dsaHNtanpjYmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDU1NDksImV4cCI6MjAzODg4MTU0OX0.BSS7nht1EZK1eBNFk99dxXg3bm6jNQ2_YNUjjudnq1E";

export const supabase = createClient(URL, API_KEY);
