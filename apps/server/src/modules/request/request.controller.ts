import type { Request, Response } from 'express';

export const requestController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    res.status(200).json({ data: [] });
  },
};
