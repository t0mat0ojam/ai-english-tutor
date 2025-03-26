import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zxopgyvgvkqefpgppkkc.supabase.co"; // Found in Supabase Dashboard
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b3BneXZndmtxZWZwZ3Bwa2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzI4ODQsImV4cCI6MjA1ODA0ODg4NH0.X0_PfNulecxCFKV8cSsA-0t8j5KauHH0W5IVc1DCbks"; // Found in Supabase Dashboard

export const supabase = createClient(supabaseUrl, supabaseKey);
