import { Request, Response } from 'express';
import productRepository from "../repositories/product.repository";

export default class ProductController {

  async findAll(req: Request, res: Response) {
    try {
      const searchParams = {};
      const products = await productRepository.retrieveAll(searchParams);
      res.status(200).json({
        message: "findAll OK",
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const createdProduct = await productRepository.save(data);
      res.status(201).json({
        message: "create OK",
        reqBody: createdProduct
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
      const product = await productRepository.retrieveById(parseInt(id));
      res.status(200).json({
        message: "findOne OK",
        reqParamId: req.params.id,
        data: product,
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

      const updateProduct = await productRepository.update({...data, id})

      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: updateProduct
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

      const deletedProduct = await productRepository.delete(parseInt(id));

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
}