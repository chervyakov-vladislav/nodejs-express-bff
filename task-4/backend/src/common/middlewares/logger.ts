import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import expressWinston from 'express-winston';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const utcTimestamp = () => {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getUTCDate()).padStart(2, '0')} ${String(
    now.getUTCHours()
  ).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(
    now.getUTCSeconds()
  ).padStart(2, '0')}`;
};

const dailyRotateTransport = new DailyRotateFile({
  filename: 'logs/requests-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH-mm',
  zippedArchive: true,
  maxSize: '10m', // 10mb
  maxFiles: '30d',
  format: winston.format.combine(
    winston.format.timestamp({ format: utcTimestamp }),
    winston.format.json()
  ),
});

const dailyRotateTransportErrors = new DailyRotateFile({
  filename: 'logs/errors-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m', // 10mb
  maxFiles: '30d',
  format: winston.format.combine(
    winston.format.timestamp({ format: utcTimestamp }),
    winston.format.json()
  ),
});

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: utcTimestamp }),
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    dailyRotateTransport,
  ],
  level: LOG_LEVEL,
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: utcTimestamp }),
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    dailyRotateTransportErrors,
  ],
  level: LOG_LEVEL,
});
