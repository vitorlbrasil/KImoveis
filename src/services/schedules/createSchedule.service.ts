import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { ScheduleUserProperty } from "../../entities/scheduleUserProperty.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(ScheduleUserProperty);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!user || !property) {
    throw new AppError("User or property not found", 404);
  }

  const alreadyScheduled = await scheduleRepository.findOne({
    where: {
      property: {
        id: property.id,
      },
      date: date,
      hour: hour,
    },
  });

  if (alreadyScheduled) {
    throw new AppError("Time not available");
  }

  const when = new Date(date + " " + hour);
  const whenHour = when.getHours();
  if (whenHour < 8 || whenHour >= 18) {
    throw new AppError("Invalid hour");
  }

  const whenDay = when.getDay();
  if (whenDay == 0 || whenDay == 6) {
    throw new AppError("You can only schedule for a business day");
  }

  await scheduleRepository.save({
    date,
    hour,
    user,
    property,
  });
};

export default createScheduleService;
