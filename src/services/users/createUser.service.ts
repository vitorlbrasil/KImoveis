import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hashSync } from "bcryptjs";
import AppError from "../../errors/appError";

const createUserService = async ({
  email,
  isAdm,
  name,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError("E-mail already being used!");
  }

  if (!password) {
    throw new AppError("Missing password");
  }

  const hashedPassword = hashSync(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
