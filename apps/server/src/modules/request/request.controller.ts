import type { Request, Response } from 'express';
import { HttpStatus } from '../../constants/index.js';
import { requestService } from './request.service.js';
import type { CreateRequestDto, UpdateRequestDto } from './request.dto.js';
import type { RequestIdParam } from './request.types.js';

export const requestController = {
  async create(
    req: Request<unknown, unknown, CreateRequestDto>,
    res: Response,
  ): Promise<void> {
    const request = await requestService.createRequest(req.body);
    res.status(HttpStatus.CREATED).json({ data: request });
  },

  async list(_req: Request, res: Response): Promise<void> {
    const requests = await requestService.listRequests();
    res.status(HttpStatus.OK).json({ data: requests });
  },

  async getById(
    req: Request<RequestIdParam>,
    res: Response,
  ): Promise<void> {
    const request = await requestService.getRequestById(req.params.requestId);
    res.status(HttpStatus.OK).json({ data: request });
  },

  async update(
    req: Request<RequestIdParam, unknown, UpdateRequestDto>,
    res: Response,
  ): Promise<void> {
    const request = await requestService.updateRequestById(
      req.params.requestId,
      req.body,
    );
    res.status(HttpStatus.OK).json({ data: request });
  },

  async remove(
    req: Request<RequestIdParam>,
    res: Response,
  ): Promise<void> {
    await requestService.deleteRequestById(req.params.requestId);
    res.status(HttpStatus.NO_CONTENT).send();
  },
};
