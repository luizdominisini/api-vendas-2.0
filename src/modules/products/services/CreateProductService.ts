import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
const repository = ProductRepository;

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    try {
      const productExist = await repository.findOneBy({ name });
      //NOTES: Verificar o que aconteceu com o método findByName que foi criado nos repositories.
      //ele que estava dando erro pois não está funcionando;

      if (productExist) {
        throw new AppError("There is already one product with that name");
      }

      const product = repository.create({
        name,
        price,
        quantity,
      });

      await repository.save(product);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Re-throw the error to be handled by the middleware
    }
  }
}

export default CreateProductService;
