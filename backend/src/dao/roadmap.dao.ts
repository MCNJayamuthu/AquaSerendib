import { supabase } from "../config/supabaseClient";
import { RoadmapItemDTO } from "../dto/RoadmapItemDTO";

export const insertRoadmapItem = async (payload: RoadmapItemDTO) => {

  const { data, error } = await supabase
    .from("roadmap_items")
    .insert([payload]);

  if (error) {

    console.error("Supabase insert error:", error);

    throw new Error(error.message);

  }

  return data;

};


export const fetchRoadmapItems = async () => {

  const { data, error } = await supabase
    .from("roadmap_items")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return data;

};


export const updateRoadmapItem = async (
  id: string,
  payload: RoadmapItemDTO
) => {

  const { data, error } = await supabase
    .from("roadmap_items")
    .update(payload)
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;

};


export const deleteRoadmapItem = async (id: string) => {

  const { data, error } = await supabase
    .from("roadmap_items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;

};