import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import AppError from "../../errors/appError";

const listCategoryPropertiesService = async (id: string): Promise<Category> => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const category = await categoriesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default listCategoryPropertiesService;
