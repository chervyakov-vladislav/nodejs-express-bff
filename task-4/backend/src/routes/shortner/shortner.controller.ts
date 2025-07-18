import { Request, Response, NextFunction } from 'express';
import { getShortUrl } from './shortner.service';

export const handleCreateShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalLink = req.body.url;

  try {
    const data = await getShortUrl(originalLink);

    res.status(201).send({
      id: data._id,
      originalLink: data.originalLink,
      shortLink: data.shortLink,
    });
  } catch (error) {
    next(error);
  }
};
