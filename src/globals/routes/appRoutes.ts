import { Application } from 'express';
import userRoutes from '../../features/user/routes/user.routes';
import authRoutes from '../../features/user/routes/auth.routes';
import candidateProfileRoutes from '../../features/candidate-profile/routes/candidate-profile.route';

export function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/candidate-profile', candidateProfileRoutes);
}
