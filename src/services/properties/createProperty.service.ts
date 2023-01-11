import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import AppError from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest): Promise<Property> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);

  const addressAlreadyExists = await addressRepository.findOne({
    where: {
      district: address.district,
      zipCode: address.zipCode,
      number: address.number,
      city: address.city,
      state: address.state,
    },
  });

  if (addressAlreadyExists) {
    throw new AppError("Address already registered");
  }

  if (address.state.length > 2) {
    throw new AppError("Invalid State");
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Invalid Zip Code");
  }

  const { city, district, state, zipCode, number } = address;
  const newAddress = addressRepository.create({
    city,
    district,
    state,
    zipCode,
    number,
  });

  await addressRepository.save(newAddress);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const newProperty = propertyRepository.create({
    value,
    size,
    category: category,
    address: newAddress,
  });

  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertyService;
