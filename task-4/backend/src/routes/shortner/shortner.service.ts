import BadRequestError from '../../common/errors/bad-request-error';
import ForbiddenError from '../../common/errors/forbidden-error';
import NotFoundError from '../../common/errors/not-found-error';
import { transformId } from '../../common/helpers/transform-mongo-id';
import { shortnerModel } from './shortner.model';

const serviceUrl = process.env.SHORTNER_API_URL || '';

interface ServiceResponse {
  short_url: string;
}

const serviceFetch = async <T = ServiceResponse>(
  link = '',
  url = serviceUrl,
  method = 'POST'
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        url: link,
      }),
    });

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Request failed: ${error.message}`);
    }

    return null;
  }
};

export const getShortUrl = async (link: string, ownerId: string) => {
  const response = await serviceFetch(link);

  if (!response) {
    throw new BadRequestError('Request failed');
  }
  const { short_url } = response;

  const data = await shortnerModel.createSafe({
    originalLink: link,
    shortLink: short_url,
    owner: transformId(ownerId),
  });

  return data;
};

export const getAllShortLinksByUser = async (ownerId: string) => {
  return shortnerModel.find({ owner: ownerId });
};

export const updateShortLink = async (
  id: string,
  newLink: string,
  ownerId: string
) => {
  const currentShortLink = await shortnerModel.findById(id);

  if (!currentShortLink) {
    throw new NotFoundError();
  }

  if (!currentShortLink.checkOwner(ownerId)) {
    throw new ForbiddenError('You have no access to this resource');
  }

  const response = await serviceFetch(newLink);

  if (!response) {
    throw new BadRequestError('Request failed');
  }

  const { short_url } = response;

  const data = await shortnerModel.updateSafe(id, {
    originalLink: newLink,
    shortLink: short_url,
  });

  return data;
};

export const removeShortLink = async (id: string, ownerId: string) => {
  const shortLink = await shortnerModel.findById(id);

  if (!shortLink) {
    throw new NotFoundError();
  }

  if (!shortLink.checkOwner(ownerId)) {
    throw new ForbiddenError('You have no access to this resource');
  }

  await shortnerModel.findByIdAndDelete(id);

  return;
};
