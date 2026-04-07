import { prisma } from '../../lib/prisma.js';
import type { CreateFolderDto, UpdateFolderDto } from './folder.dto.js';

export const folderRepository = {
  async create(collectionId: string, data: CreateFolderDto) {
    return prisma.folder.create({
      data: { ...data, collectionId },
    });
  },

  async findManyByCollectionId(collectionId: string) {
    return prisma.folder.findMany({
      where: { collectionId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.folder.findUnique({ where: { id } });
  },

  async updateById(id: string, data: UpdateFolderDto) {
    return prisma.folder.update({ where: { id }, data });
  },

  async deleteById(id: string) {
    return prisma.folder.delete({ where: { id } });
  },
};
