import AppError from "../../../shared/errors/AppError"; //middleware
import Product from "../typeorm/entities/Product"; //entidade
import ProductRepository from "../typeorm/repositories/ProductRepository"; //Repositorio
const repository = ProductRepository;

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExist = await repository.findByName(name);

    if (productExist) {
      throw new AppError("There is already one product with that name");
    }

    const product = repository.create({
      name: name,
      price: price,
      quantity: quantity,
    });

    await repository.save(product);
    return product;
  }
}

export default CreateProductService;
