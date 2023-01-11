import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.service";
import listPropertySchedulesService from "../services/schedules/listPropertySchedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { propertyId, date, hour } = req.body;
  await createScheduleService({ userId, propertyId, date, hour });
  return res.status(201).json({
    message: "Schedule created",
  });
};

const listPropertySchedulesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await listPropertySchedulesService(id);
  return res.json(property);
};

export { createScheduleController, listPropertySchedulesController };
