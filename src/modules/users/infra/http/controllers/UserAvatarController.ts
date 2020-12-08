import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarServices from '@modules/users/services/UploadUserAvatarServices';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarServices);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
