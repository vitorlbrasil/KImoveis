import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { ScheduleUserProperty } from "../../entities/scheduleUserProperty.entity";
import AppError from "../../errors/appError";

const listPropertySchedulesService = async (id: string): Promise<Property> => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(ScheduleUserProperty);

  const property = await propertyRepository.findOne({
    where: {
      id,
    },
    relations: {
      schedules: true,
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return property;
};

export default listPropertySchedulesService;
