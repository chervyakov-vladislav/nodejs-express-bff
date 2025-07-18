import BadRequestError from '../../common/errors/bad-request-error';
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

export const getShortUrl = async (link: string) => {
  const response = await serviceFetch(link);

  if (!response) {
    throw new BadRequestError('Request failed');
  }
  const { short_url } = response;

  const data = await shortnerModel.createSafe({
    originalLink: link,
    shortLink: short_url,
  });

  return data;
};
