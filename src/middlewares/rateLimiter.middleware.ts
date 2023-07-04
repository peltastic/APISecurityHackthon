import rateLimit from "express-rate-limit"

export const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 500,
  message: 'You have exceeded the 500 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});

