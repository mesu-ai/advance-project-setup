export const decodeJwt = <T extends Record<string, unknown>>(token: string): T | null => {
  if (!token || typeof token !== 'string') return null;
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;

    // convert from base64Url to base64
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');

    // decode base64 and parse JSON (browser-safe)
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('⚠️ Failed to decode JWT:', error);
    return null;
  }
};
