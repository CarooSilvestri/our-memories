import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

/* dotenv.config(); // Cargar las variables del archivo .env
 */
const supabaseUrl ='https://mjjmgnbqzpomayrqwnct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qam1nbmJxenBvbWF5cnF3bmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwOTQ3MzAsImV4cCI6MjA1MzY3MDczMH0.-GI2FMBbtTk23DNMsmDySlUgWKl56PSOtt_uao4yApk';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL o SUPABASE_KEY no están definidos en .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
