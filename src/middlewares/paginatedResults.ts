import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
interface CustomResponse extends Response {
  paginatedResults?: any;
}
function paginatedResults(model: Model<any>) {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: any = {};
    try {
      const totalDocuments = await model.countDocuments();
      results.total = totalDocuments;
      if (endIndex < totalDocuments) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.results = await model.find().limit(limit).skip(startIndex);
      res.paginatedResults = results;
      next();
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  };
}
export default paginatedResults;
