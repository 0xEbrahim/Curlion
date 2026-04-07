import { AppError } from '../../lib/AppError.js';
import { HttpStatus } from '../../constants/index.js';
import { collectionService } from '../collection/collection.service.js';
import { folderRepository } from './folder.repository.js';
import type { CreateFolderDto, UpdateFolderDto } from './folder.dto.js';
import type { FolderResponse } from './folder.types.js';

export const folderService = {
  async createFolder(
    collectionId: string,
    data: CreateFolderDto,
  ): Promise<FolderResponse> {
    await collectionService.getCollectionById(collectionId);

    if (data.parentId) {
      await folderService.assertFolderInCollection(
        data.parentId,
        collectionId,
      );
    }

    return folderRepository.create(collectionId, data);
  },

  async listFolders(collectionId: string): Promise<FolderResponse[]> {
    await collectionService.getCollectionById(collectionId);
    return folderRepository.findManyByCollectionId(collectionId);
  },

  async getFolderById(
    collectionId: string,
    folderId: string,
  ): Promise<FolderResponse> {
    const folder = await folderRepository.findById(folderId);

    if (!folder || folder.collectionId !== collectionId) {
      throw new AppError('Folder not found', HttpStatus.NOT_FOUND);
    }

    return folder;
  },

  async updateFolderById(
    collectionId: string,
    folderId: string,
    data: UpdateFolderDto,
  ): Promise<FolderResponse> {
    await folderService.getFolderById(collectionId, folderId);

    if (data.parentId) {
      if (data.parentId === folderId) {
        throw new AppError(
          'A folder cannot be its own parent',
          HttpStatus.BAD_REQUEST,
        );
      }

      await folderService.assertFolderInCollection(
        data.parentId,
        collectionId,
      );
      await folderService.assertNoCycle(folderId, data.parentId);
    }

    return folderRepository.updateById(folderId, data);
  },

  async deleteFolderById(
    collectionId: string,
    folderId: string,
  ): Promise<void> {
    await folderService.getFolderById(collectionId, folderId);
    await folderRepository.deleteById(folderId);
  },

  async assertFolderInCollection(
    folderId: string,
    collectionId: string,
  ): Promise<void> {
    const folder = await folderRepository.findById(folderId);

    if (!folder || folder.collectionId !== collectionId) {
      throw new AppError(
        'Parent folder not found in this collection',
        HttpStatus.NOT_FOUND,
      );
    }
  },

  /** Walks up the ancestor chain to prevent circular nesting. */
  async assertNoCycle(
    folderId: string,
    newParentId: string,
  ): Promise<void> {
    let currentId: string | null = newParentId;

    while (currentId) {
      if (currentId === folderId) {
        throw new AppError(
          'Cannot move folder: would create a circular reference',
          HttpStatus.BAD_REQUEST,
        );
      }

      const ancestor = await folderRepository.findById(currentId);
      currentId = ancestor?.parentId ?? null;
    }
  },
};
