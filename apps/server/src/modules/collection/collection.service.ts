import { AppError } from '../../lib/AppError.js';
import { HttpStatus } from '../../constants/index.js';
import { collectionRepository } from './collection.repository.js';
import type { CreateCollectionDto, UpdateCollectionDto } from './collection.dto.js';
import type { CollectionResponse } from './collection.types.js';

export const collectionService = {
  async createCollection(data: CreateCollectionDto): Promise<CollectionResponse> {
    return collectionRepository.create(data);
  },

  async listCollections(): Promise<CollectionResponse[]> {
    return collectionRepository.findMany();
  },

  async getCollectionById(id: string): Promise<CollectionResponse> {
    const collection = await collectionRepository.findById(id);

    if (!collection) {
      throw new AppError('Collection not found', HttpStatus.NOT_FOUND);
    }

    return collection;
  },

  async updateCollectionById(
    id: string,
    data: UpdateCollectionDto,
  ): Promise<CollectionResponse> {
    await collectionService.getCollectionById(id);
    return collectionRepository.updateById(id, data);
  },

  async deleteCollectionById(id: string): Promise<void> {
    await collectionService.getCollectionById(id);
    await collectionRepository.deleteById(id);
  },
};
