import type { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import type { CreateRequestDto, UpdateRequestDto } from './request.dto.js';
import type { RequestBody, RequestResponse, RequestMethod } from './request.types.js';

function mapRequest(record: {
  id: string;
  name: string;
  collectionId: string;
  folderId: string | null;
  method: string;
  url: string;
  headers: string;
  queryParams: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}): RequestResponse {
  return {
    id: record.id,
    name: record.name,
    collectionId: record.collectionId,
    folderId: record.folderId,
    method: record.method as RequestMethod,
    url: record.url,
    headers: JSON.parse(record.headers),
    queryParams: JSON.parse(record.queryParams),
    body: JSON.parse(record.body) as RequestBody,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function serializeCreateRequestData(
  data: CreateRequestDto,
): Prisma.RequestUncheckedCreateInput {
  const serializedData: Prisma.RequestUncheckedCreateInput = {
    name: data.name,
    collectionId: data.collectionId,
    method: data.method,
    url: data.url,
    headers: JSON.stringify(data.headers),
    queryParams: JSON.stringify(data.queryParams),
    body: JSON.stringify(data.body),
  };

  if (data.folderId !== undefined) {
    serializedData.folderId = data.folderId;
  }

  return serializedData;
}

function serializeUpdateRequestData(
  data: UpdateRequestDto,
): Prisma.RequestUncheckedUpdateInput {
  const serializedData: Prisma.RequestUncheckedUpdateInput = {};

  if (data.name !== undefined) {
    serializedData.name = data.name;
  }

  if (data.collectionId !== undefined) {
    serializedData.collectionId = data.collectionId;
  }

  if (data.folderId !== undefined) {
    serializedData.folderId = data.folderId;
  }

  if (data.method !== undefined) {
    serializedData.method = data.method;
  }

  if (data.url !== undefined) {
    serializedData.url = data.url;
  }

  if (data.headers !== undefined) {
    serializedData.headers = JSON.stringify(data.headers);
  }

  if (data.queryParams !== undefined) {
    serializedData.queryParams = JSON.stringify(data.queryParams);
  }

  if (data.body !== undefined) {
    serializedData.body = JSON.stringify(data.body);
  }

  return serializedData;
}

export const requestRepository = {
  async create(data: CreateRequestDto): Promise<RequestResponse> {
    const request = await prisma.request.create({
      data: serializeCreateRequestData(data),
    });

    return mapRequest(request);
  },

  async findMany(): Promise<RequestResponse[]> {
    const requests = await prisma.request.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return requests.map(mapRequest);
  },

  async findById(id: string): Promise<RequestResponse | null> {
    const request = await prisma.request.findUnique({ where: { id } });
    return request ? mapRequest(request) : null;
  },

  async updateById(
    id: string,
    data: UpdateRequestDto,
  ): Promise<RequestResponse> {
    const request = await prisma.request.update({
      where: { id },
      data: serializeUpdateRequestData(data),
    });

    return mapRequest(request);
  },

  async deleteById(id: string) {
    return prisma.request.delete({ where: { id } });
  },
};
