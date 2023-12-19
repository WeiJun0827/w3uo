import { CarReader } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'
import * as Signer from '@ucanto/principal/ed25519'
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/access/stores/store-memory'

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data) {
  const blocks: any[] = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return importDAG(blocks)
}

async function main() {
  const KEY = ''
  const PROOF = 'EaJlcm9vdHOAZ3ZlcnNpb24BwQUBcRIgZqEkRYcwhOcjGGGPHiz3YJyly4dzmuqbPdnCKyFgLl+oYXNYRO2hA0DrcEW5B0y7+yW7I1cOkPVfEF1uobo1v+bs6tdeJuIb53iMtY2iTLtcEcmOLxpZwcjRrlVtsynkQfS3zzQRMswPYXZlMC45LjFjYXR0hqJjY2FuZ3NwYWNlLypkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVqiY2NhbmdzdG9yZS8qZHdpdGh4OGRpZDprZXk6ejZNa2dLcEhKc1RmN0FycnlFRFFaTlNtNVRXVEhjZjc3dUZkejhieVlSRjdSRWFaomNjYW5odXBsb2FkLypkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVqiY2NhbmhhY2Nlc3MvKmR3aXRoeDhkaWQ6a2V5Ono2TWtnS3BISnNUZjdBcnJ5RURRWk5TbTVUV1RIY2Y3N3VGZHo4YnlZUkY3UkVhWqJjY2FuamZpbGVjb2luLypkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVqiY2Nhbmd1c2FnZS8qZHdpdGh4OGRpZDprZXk6ejZNa2dLcEhKc1RmN0FycnlFRFFaTlNtNVRXVEhjZjc3dUZkejhieVlSRjdSRWFaY2F1ZFgi7QELuXawZJkCQZj/EWqDUkL2NceQmzSgPgbGano1oBfC6GNleHAaZz74HmNmY3SBoWVzcGFjZaFkbmFtZWlsb2NhbHRlc3RjaXNzWCLtARvPLWTTkjmkdsAxcAlVtJ76O7OQbZOQsU9naNNUZS7OY3ByZoDBBQFxEiBmoSRFhzCE5yMYYY8eLPdgnKXLh3Oa6ps92cIrIWAuX6hhc1hE7aEDQOtwRbkHTLv7JbsjVw6Q9V8QXW6hujW/5uzq114m4hvneIy1jaJMu1wRyY4vGlnByNGuVW2zKeRB9LfPNBEyzA9hdmUwLjkuMWNhdHSGomNjYW5nc3BhY2UvKmR3aXRoeDhkaWQ6a2V5Ono2TWtnS3BISnNUZjdBcnJ5RURRWk5TbTVUV1RIY2Y3N3VGZHo4YnlZUkY3UkVhWqJjY2FuZ3N0b3JlLypkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVqiY2Nhbmh1cGxvYWQvKmR3aXRoeDhkaWQ6a2V5Ono2TWtnS3BISnNUZjdBcnJ5RURRWk5TbTVUV1RIY2Y3N3VGZHo4YnlZUkY3UkVhWqJjY2FuaGFjY2Vzcy8qZHdpdGh4OGRpZDprZXk6ejZNa2dLcEhKc1RmN0FycnlFRFFaTlNtNVRXVEhjZjc3dUZkejhieVlSRjdSRWFaomNjYW5qZmlsZWNvaW4vKmR3aXRoeDhkaWQ6a2V5Ono2TWtnS3BISnNUZjdBcnJ5RURRWk5TbTVUV1RIY2Y3N3VGZHo4YnlZUkY3UkVhWqJjY2FuZ3VzYWdlLypkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVpjYXVkWCLtAQu5drBkmQJBmP8RaoNSQvY1x5CbNKA+BsZqejWgF8LoY2V4cBpnPvgeY2ZjdIGhZXNwYWNloWRuYW1laWxvY2FsdGVzdGNpc3NYIu0BG88tZNOSOaR2wDFwCVW0nvo7s5Btk5CxT2do01RlLs5jcHJmgN8DAXESINet09MPpKRSf5NUJHwtuJiehWOqiQpNTSxn9OOtRWTHqGFzWETtoQNAI6VmlEQiGWhE5RY5W5J53y8Kh92BHoudi8ybjdYjOMQ1o/9Ty6vzLqNGdDQ5mAip2UoUmJMH+S9Bj1Ofj/SiBmF2ZTAuOS4xY2F0dIKiY2NhbmlzdG9yZS9hZGRkd2l0aHg4ZGlkOmtleTp6Nk1rZ0twSEpzVGY3QXJyeUVEUVpOU201VFdUSGNmNzd1RmR6OGJ5WVJGN1JFYVqiY2Nhbmp1cGxvYWQvYWRkZHdpdGh4OGRpZDprZXk6ejZNa2dLcEhKc1RmN0FycnlFRFFaTlNtNVRXVEhjZjc3dUZkejhieVlSRjdSRWFaY2F1ZFgi7QH3Aedht9aZ/60dY0kSrBmGdeSn28Jg7MAMJgs3QQvsEmNleHD2Y2ZjdIGhZXNwYWNloWRuYW1laWxvY2FsdGVzdGNpc3NYIu0BC7l2sGSZAkGY/xFqg1JC9jXHkJs0oD4Gxmp6NaAXwuhjcHJmgtgqWCUAAXESIGahJEWHMITnIxhhjx4s92CcpcuHc5rqmz3ZwishYC5f2CpYJQABcRIgZqEkRYcwhOcjGGGPHiz3YJyly4dzmuqbPdnCKyFgLl8='

  // const principal = Signer.parse(KEY)
  // const client = await Client.create({ principal, store: new StoreMemory() })

  // now give Agent the delegation from the Space
  const proof = await parseProof(PROOF)
  // const space = await client.addSpace(proof)
  // await client.setCurrentSpace(space.did())
  console.log('done');
}

main();
