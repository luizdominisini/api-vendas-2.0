import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProduct = new ShowProductService();
    const { id } = request.params;
    const product = await showProduct.execute({ id });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createProduct = new CreateProductService();
    const { name, price, quantity } = request.body;
    const product = await createProduct.execute({ name, price, quantity });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProduct = new UpdateProductService();
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProduct = new DeleteProductService();
    const { id } = request.params;
    await deleteProduct.execute({ id });
    return response.json([]);
  }
}

export default ProductsController;
