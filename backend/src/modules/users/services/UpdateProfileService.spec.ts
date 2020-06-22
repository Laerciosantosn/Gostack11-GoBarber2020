import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be albe to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@exemplo.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'JohnTre@exemplo.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('JohnTre@exemplo.com');
  });

  it('Should not be albe to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@gobarber.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be albe to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@exemplo.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@exemplo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'Johndoe@exemplo.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be albe to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@exemplo.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'JohnTre@exemplo.com',
      old_password: '123456',
      password: '123123',
    });
    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be albe to update the password with old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@exemplo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'JohnTre@exemplo.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be albe to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@exemplo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'JohnTre@exemplo.com',
        old_password: 'Wrong-OldPassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
