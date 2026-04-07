import type { Request, Response } from 'express';
import { HttpStatus } from '../../constants/index.js';
import { folderService } from './folder.service.js';
import type { CreateFolderDto, UpdateFolderDto } from './folder.dto.js';
import type { FolderCollectionParam, FolderParams } from './folder.types.js';

export const folderController = {
  async create(
    req: Request<FolderCollectionParam, unknown, CreateFolderDto>,
    res: Response,
  ): Promise<void> {
    const folder = await folderService.createFolder(
      req.params.collectionId,
      req.body,
    );
    res.status(HttpStatus.CREATED).json({ data: folder });
  },

  async list(
    req: Request<FolderCollectionParam>,
    res: Response,
  ): Promise<void> {
    const folders = await folderService.listFolders(
      req.params.collectionId,
    );
    res.status(HttpStatus.OK).json({ data: folders });
  },

  async getById(
    req: Request<FolderParams>,
    res: Response,
  ): Promise<void> {
    const folder = await folderService.getFolderById(
      req.params.collectionId,
      req.params.folderId,
    );
    res.status(HttpStatus.OK).json({ data: folder });
  },

  async update(
    req: Request<FolderParams, unknown, UpdateFolderDto>,
    res: Response,
  ): Promise<void> {
    const folder = await folderService.updateFolderById(
      req.params.collectionId,
      req.params.folderId,
      req.body,
    );
    res.status(HttpStatus.OK).json({ data: folder });
  },

  async remove(
    req: Request<FolderParams>,
    res: Response,
  ): Promise<void> {
    await folderService.deleteFolderById(
      req.params.collectionId,
      req.params.folderId,
    );
    res.status(HttpStatus.NO_CONTENT).send();
  },
};
