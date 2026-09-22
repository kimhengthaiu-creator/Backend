import { clerkMiddleware, getAuth } from '@clerk/express';
import { config } from '../config/index.js';

const isDev = config.nodeEnv !== 'production';
const hasPlaceholderClerk =
  !config.clerkSecretKey ||
  config.clerkSecretKey.includes('placeholder') ||
  config.clerkSecretKey === '';

// Export the Clerk global middleware to be mounted in index.js before routes.
// It attaches auth state to every request so getAuth(req) works everywhere.
export const clerkGlobalMiddleware = (req, res, next) => {
  if (hasPlaceholderClerk) {
    return next();
  }
  return clerkMiddleware({
    publishableKey: config.clerkPublishableKey,
    secretKey: config.clerkSecretKey,
  })(req, res, next);
};

/**
 * requireAuth — protects individual routes.
 *
 * In production (real Clerk key): verifies the JWT via Clerk SDK and reads
 * userId from the auth object.
 *
 * In development with a placeholder key: falls back to the x-user-id header
 * or the static demo user so local dev works without real credentials.
 */
export const requireAuth = (req, res, next) => {
  // Dev fallback when Clerk is not configured
  if (isDev && hasPlaceholderClerk) {
    req.userId = req.headers['x-user-id'] || 'user_demo_learner';
    return next();
  }

  // Production: read userId set by clerkMiddleware()
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { message: 'Unauthorized: Authentication required' },
    });
  }

  req.userId = userId;
  return next();
};
