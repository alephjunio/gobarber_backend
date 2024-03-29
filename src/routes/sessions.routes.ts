import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
