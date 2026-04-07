import type { Request, Response } from 'express';
import { HttpStatus } from '../../constants/index.js';
import { collectionService } from './collection.service.js';
import type { CreateCollectionDto, UpdateCollectionDto } from './collection.dto.js';
import type { CollectionIdParam } from './collection.types.js';

export const collectionController = {
  async create(
    req: Request<unknown, unknown, CreateCollectionDto>,
    res: Response,
  ): Promise<void> {
    const collection = await collectionService.createCollection(req.body);
    res.status(HttpStatus.CREATED).json({ data: collection });
  },

  async list(_req: Request, res: Response): Promise<void> {
    const collections = await collectionService.listCollections();
    res.status(HttpStatus.OK).json({ data: collections });
  },

  async getById(
    req: Request<CollectionIdParam>,
    res: Response,
  ): Promise<void> {
    const collection = await collectionService.getCollectionById(
      req.params.collectionId,
    );
    res.status(HttpStatus.OK).json({ data: collection });
  },

  async update(
    req: Request<CollectionIdParam, unknown, UpdateCollectionDto>,
    res: Response,
  ): Promise<void> {
    const collection = await collectionService.updateCollectionById(
      req.params.collectionId,
      req.body,
    );
    res.status(HttpStatus.OK).json({ data: collection });
  },

  async remove(
    req: Request<CollectionIdParam>,
    res: Response,
  ): Promise<void> {
    await collectionService.deleteCollectionById(req.params.collectionId);
    res.status(HttpStatus.NO_CONTENT).send();
  },
};
