import { Request, Response } from "express";

import {
  createRoadmapItemService,
  getRoadmapItemsService,
  updateRoadmapItemService,
  deleteRoadmapItemService
} from "../services/roadmap.service";


export const createRoadmapItemController = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await createRoadmapItemService(req.body);

    res.status(201).json(data);

  } catch (error: any) {

    res.status(500).json({ error: error.message });

  }

};


export const getRoadmapItemsController = async (req: Request, res: Response) => {

  try {

    const data = await getRoadmapItemsService();

    res.status(200).json(data);

  } catch (error: any) {

      res.status(500).json({
      message: "Failed to fetch support messages",
      error: error.message
    });

  }

};


export const updateRoadmapItemController = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await updateRoadmapItemService(
      req.params.id as string,
      req.body
    );

    res.json(data);

  } catch (error: any) {

    res.status(500).json({ error: error.message });

  }

};


export const deleteRoadmapItemController = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await deleteRoadmapItemService(
      req.params.id as string
    );

    res.json(data);

  } catch (error: any) {

    res.status(500).json({ error: error.message });

  }

};