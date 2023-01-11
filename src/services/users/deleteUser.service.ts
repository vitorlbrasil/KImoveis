import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

const deleteUserService = async (
  id: string
): Promise<void | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  const found = await userRepository.findOneBy({
    id,
  });

  if (!found) {
    throw new AppError("User not found!", 404);
  }

  if (!found.isActive) {
    throw new AppError("User already deleted!");
  }

  await userRepository.update(id, {
    isActive: false,
  });
};

export default deleteUserService;
