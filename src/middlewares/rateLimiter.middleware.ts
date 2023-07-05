import rateLimit from "express-rate-limit";

export function createLimiter (message: string, timeFrameMinutes: number, maxRequests: number) {
  return rateLimit ({
    windowMs: timeFrameMinutes * 60 * 1000,
    max:maxRequests,
    message: message,
    standardHeaders: true,
    legacyHeaders: true,
  })
}
