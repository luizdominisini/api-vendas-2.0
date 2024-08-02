import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product"; //entidade
import ProductRepository from "../typeorm/repositories/ProductRepository"; //Repositorio
const repository = ProductRepository;

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await repository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError("Product not found");
    }

    return product;
  }
}

export default ShowProductService;
