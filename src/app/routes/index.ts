import express from 'express';

const router = express.Router();
const route = '/route';
const moduleRoutes = [
  {
    path: '/example',
    routes: route,
  },
];

// moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
