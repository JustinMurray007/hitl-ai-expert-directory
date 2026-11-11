/**
 * Tally signs the raw JSON body with HMAC-SHA256 and base64-encodes the digest
 * in the `Tally-Signature` header. Hash those exact bytes. Re-serializing the
 * parsed JSON can change key order or whitespace and reject a real delivery.
 * https://tally.so/help/webhooks
 */
export async function tallySignature(rawBody: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  return bytesToBase64(new Uint8Array(mac));
}

export async function verifyTallySignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): Promise<boolean> {
  if (!signatureHeader || !secret) return false;
  const expected = await tallySignature(rawBody, secret);
  return timingSafeEqual(expected, signatureHeader.trim());
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function timingSafeEqual(expected: string, received: string): boolean {
  const left = new TextEncoder().encode(expected);
  const right = new TextEncoder().encode(received);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}
