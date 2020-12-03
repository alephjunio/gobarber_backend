import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  response.json({ user, token });
});

export default sessionsRouter;
