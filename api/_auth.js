// Shared auth verification for serverless functions
// Decodes JWT from Authorization header and verifies expiry

export function verifyAuth(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);

  try {
    // Decode JWT payload (base64url)
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    );

    // Check expiry
    if (payload.exp && payload.exp < Date.now() / 1000) return null;

    return {
      userId: payload.sub || payload.id,
      email: payload.email,
    };
  } catch (e) {
    return null;
  }
}
