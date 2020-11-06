import { Router } from 'express';
import CreateUserServices from '../services/CreateUsersServices';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
