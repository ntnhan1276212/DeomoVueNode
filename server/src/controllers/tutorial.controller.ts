import { Request, Response } from 'express';
import tutorialRepository from '../repositories/tutorial.repository';
import Tutorial from '../models/tutorial.model';

export default class TutorialController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const createdTutorial = await tutorialRepository.save(data);
      res.status(201).json({
        message: "create OK",
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const searchParams = {};
      const tutorials = await tutorialRepository.retrieveAll(searchParams);
      res.status(200).json({
        message: "findAll OK",
        data: tutorials,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tutorial = await tutorialRepository.retrieveById(parseInt(id));
      res.status(200).json({
        message: "findOne OK",
        reqParamId: req.params.id,
        data: tutorial,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedTutorial = await tutorialRepository.update({...data, id})

      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedTutorial = await tutorialRepository.delete(parseInt(id));

      res.status(200).json({
        message: "delete OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    
  }

  async findAllPublished(req: Request, res: Response) {
    
  }
}