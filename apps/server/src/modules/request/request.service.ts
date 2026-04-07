import { AppError } from '../../lib/AppError.js';
import { HttpStatus } from '../../constants/index.js';
import { collectionService } from '../collection/collection.service.js';
import { folderService } from '../folder/folder.service.js';
import { requestRepository } from './request.repository.js';
import type { CreateRequestDto, UpdateRequestDto } from './request.dto.js';
import type { RequestResponse } from './request.types.js';

export const requestService = {
  async createRequest(data: CreateRequestDto): Promise<RequestResponse> {
    await collectionService.getCollectionById(data.collectionId);

    if (data.folderId) {
      await folderService.assertFolderInCollection(
        data.folderId,
        data.collectionId,
      );
    }

    return requestRepository.create(data);
  },

  async listRequests(): Promise<RequestResponse[]> {
    return requestRepository.findMany();
  },

  async getRequestById(id: string): Promise<RequestResponse> {
    const request = await requestRepository.findById(id);

    if (!request) {
      throw new AppError('Request not found', HttpStatus.NOT_FOUND);
    }

    return request;
  },

  async updateRequestById(
    id: string,
    data: UpdateRequestDto,
  ): Promise<RequestResponse> {
    const existingRequest = await requestService.getRequestById(id);

    const targetCollectionId = data.collectionId ?? existingRequest.collectionId;
    const targetFolderId =
      data.folderId !== undefined ? data.folderId : existingRequest.folderId;

    await collectionService.getCollectionById(targetCollectionId);

    if (targetFolderId) {
      await folderService.assertFolderInCollection(
        targetFolderId,
        targetCollectionId,
      );
    }

    return requestRepository.updateById(id, data);
  },

  async deleteRequestById(id: string): Promise<void> {
    await requestService.getRequestById(id);
    await requestRepository.deleteById(id);
  },
};
