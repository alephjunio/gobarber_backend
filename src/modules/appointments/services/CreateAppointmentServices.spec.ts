import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentServices';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const apopointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '14251452',
    });

    expect(apopointment).toHaveProperty('id');
    expect(apopointment.provider_id).toBe('14251452');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const date = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date,
      provider_id: '14251452',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '14251452',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
