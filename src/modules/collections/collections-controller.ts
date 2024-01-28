import { Request, Response, NextFunction } from "express";
import { AddCollectionDto } from "../../validations/collections";
import Container from "typedi";
import { CollectionsService } from "./collections-service";

export const createCollectionHandler = async (
  req: Request<never, any, AddCollectionDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const collectionsService = Container.get(CollectionsService);
    await collectionsService.createCollection(req.body);
    res.send("OK BRO");
  } catch (error) {
    next(error);
  }
};
