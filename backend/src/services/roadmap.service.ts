import {
  insertRoadmapItem,
  fetchRoadmapItems,
  updateRoadmapItem,
  deleteRoadmapItem
} from "../dao/roadmap.dao";

import { RoadmapItemDTO } from "../dto/RoadmapItemDTO";


export const createRoadmapItemService = async (
  payload: RoadmapItemDTO
) => {

  const data = await insertRoadmapItem(payload);

  return data;

};


export const getRoadmapItemsService = async () => {

  const data = await fetchRoadmapItems();

  return data;

};


export const updateRoadmapItemService = async (
  id: string,
  payload: RoadmapItemDTO
) => {

  const data = await updateRoadmapItem(id, payload);

  return data;

};


export const deleteRoadmapItemService = async (
  id: string
) => {

  const data = await deleteRoadmapItem(id);

  return data;

};