import { Request, Response, NextFunction } from 'express';
import {
  getShortUrl,
  getAllShortLinksByUser,
  updateShortLink,
  removeShortLink,
} from './shortner.service';

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

export const handleGetShortLinkByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = res.locals.user.id;

    const links = await getAllShortLinksByUser(ownerId);

    res.status(200).send(
      links.map((link) => ({
        id: link._id,
        shortLink: link.shortLink,
        originalLink: link.originalLink,
      })) || []
    );
  } catch (error) {
    next(error);
  }
};

export const handleUpdateShortLinkByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const newUrl = req.body.url;
    const ownerId = res.locals.user.id;

    const newLink = await updateShortLink(id, newUrl, ownerId);

    res.status(200).send({
      id: newLink._id,
      shortLink: newLink.shortLink,
      originalLink: newLink.originalLink,
    });
  } catch (error) {
    next(error);
  }
};

export const handleRemoveShortLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const ownerId = res.locals.user.id;

    await removeShortLink(id, ownerId);

    res.send({ id });
  } catch (error) {
    next(error);
  }
};
