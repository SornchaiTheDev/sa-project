async function hashSHA256(str: string): Promise<ArrayBuffer> {
  const utf8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  return hashBuffer;
}

async function base64_arraybuffer(data: ArrayBuffer): Promise<string> {
  // Use a FileReader to generate a base64 data URI
  const base64url: string = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result as string);
    reader.readAsDataURL(new Blob([data]));
  });

  /*
  The result looks like
  "data:application/octet-stream;base64,<your base64 data>",
  so we split off the beginning:
  */
  return base64url.split(",", 2)[1];
}

async function encode(input: ArrayBuffer): Promise<string> {
  return (await base64_arraybuffer(input))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function pkceChallengeFromVerifier(v: string) {
  const hash = await hashSHA256(v);
  const challenge = encode(hash);
  return challenge;
}
