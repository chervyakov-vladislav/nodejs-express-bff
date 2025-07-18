import { Request, Response, NextFunction } from 'express';
import { getShortUrl } from './shortner.service';

export const handleCreateShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalLink = req.body.url;
  const ownerId = res.locals.user.id;

  try {
    const data = await getShortUrl(originalLink, ownerId);

    res.status(201).send({
      id: data._id,
      originalLink: data.originalLink,
      shortLink: data.shortLink,
      owner: data.owner,
    });
  } catch (error) {
    next(error);
  }
};
