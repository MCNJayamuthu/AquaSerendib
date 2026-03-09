import { supabase } from "../config/supabaseClient";

export const findAdminByUsername = async (username: string) => {

  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .single();

  if (error) return null;

  return data;
};