import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakesHashProvider';
import CreateUserService from './CreateUsersServices';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await CreateUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@exemple.com.br',
      password: '123465789',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a two user with  same the  email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = {
      name: 'Jhon Doe',
      email: 'jhon@exemple.com.br',
      password: '123465789',
    };

    await CreateUser.execute(user);

    expect(CreateUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
