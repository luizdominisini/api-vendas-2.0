import Product from "../typeorm/entities/Product"; //entidade
import ProductRepository from "../typeorm/repositories/ProductRepository"; //Repositorio
const repository = ProductRepository;

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await repository.find();
    return products;
  }
}

export default ListProductService;
