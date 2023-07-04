import crypto from "crypto";
import { encode } from "hi-base32";

export function generateRandomBase32() {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
}
