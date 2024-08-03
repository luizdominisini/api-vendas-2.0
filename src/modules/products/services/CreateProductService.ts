import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import dataSource from "../../../shared/typeorm";
import { Repository } from "typeorm";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    try {
      const productExist = await this.repository.findOneBy({ name });

      if (productExist) {
        throw new AppError("There is already one product with that name");
      }

      const product = this.repository.create({
        name,
        price,
        quantity,
      });

      await this.repository.save(product);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Re-throw the error to be handled by the middleware
    }
  }
}

export default CreateProductService;
