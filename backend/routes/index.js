import express from 'express';
import filesRoute from './files.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/files',
    route: filesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router
