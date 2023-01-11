import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import AppError from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories/index";

const createCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryAlreadyExists = await categoryRepository.findOneBy({
    name,
  });

  if (categoryAlreadyExists) {
    throw new AppError("This category already exists!");
  }

  const newCategory = categoryRepository.create({ name });
  await categoryRepository.save(newCategory);
  return newCategory;
};

export default createCategoryService;
