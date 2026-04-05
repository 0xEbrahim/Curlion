import type { NextFunction, Request, Response } from "express";
import { CreateCollectionDto } from "./collection.dto.js";

export const collectionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const body: CreateCollectionDto = req.body as CreateCollectionDto;
  },
};
