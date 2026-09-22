import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import healthRoutes from './routes/health.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import progressRoutes from './routes/progress.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { clerkGlobalMiddleware } from './middlewares/auth.middleware.js';

const app = express();

const allowedOrigins = config.frontendUrl
  ? config.frontendUrl.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkGlobalMiddleware);

// Routes
app.use('/api', healthRoutes);
app.use('/api', courseRoutes);
app.use('/api', lessonRoutes);
app.use('/api', progressRoutes);

// Error Handling Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(
      `Vibelearn backend listening on http://localhost:${config.port}`
    );
  });
}

export default app;
