import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakesHashProvider';

import CreateUserService from './CreateUsersServices';
import AuthenticateUserService from './AuthenticateUserServices';

describe('AuthenticateUser', () => {
  it('should be able to authenticate.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await CreateUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@exemple.com.br',
      password: '123465789',
    });

    const response = await authenticateUser.execute({
      email: 'jhon@exemple.com.br',
      password: '123465789',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a user that does not exist.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'jhon@exemple.com.br',
        password: '123465789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a user who has the wrong password or email.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await CreateUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@exemple.com.br',
      password: '123465789',
    });

    expect(
      authenticateUser.execute({
        email: 'jhon@exemple.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
