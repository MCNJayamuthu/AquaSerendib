import { supabase } from '../config/supabaseClient';
import { SupportMessageDTO } from '../dto/SupportMessageDTO';

export const insertSupportMessage = async (
  payload: SupportMessageDTO
) => {
  const { data, error } = await supabase
    .from('support_messages')
    .insert([payload]);

  if (error) throw new Error(error.message);

  return data;
};