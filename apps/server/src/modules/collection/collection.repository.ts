import { prisma } from '../../lib/prisma.js';
import type { CreateCollectionDto, UpdateCollectionDto } from './collection.dto.js';

export const collectionRepository = {
  async create(data: CreateCollectionDto) {
    return prisma.collection.create({ data });
  },

  async findMany() {
    return prisma.collection.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.collection.findUnique({ where: { id } });
  },

  async updateById(id: string, data: UpdateCollectionDto) {
    return prisma.collection.update({ where: { id }, data });
  },

  async deleteById(id: string) {
    return prisma.collection.delete({ where: { id } });
  },
};
