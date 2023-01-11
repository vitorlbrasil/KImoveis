import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";

const updateUserService = async (
  { email, name, password }: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const found = await userRepository.findOneBy({
    id,
  });

  if (!found) {
    throw new AppError("User not found!", 404);
  }

  await userRepository.update(id, {
    email: email ? email : found.email,
    name: name ? name : found.name,
    password: password ? hashSync(password, 10) : found.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default updateUserService;
