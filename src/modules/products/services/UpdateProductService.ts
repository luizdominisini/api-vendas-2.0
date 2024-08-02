import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product"; //entidade
import ProductRepository from "../typeorm/repositories/ProductRepository"; //Repositorio
const repository = ProductRepository;

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await repository.findOne({ where: { id: id } }); //Procura o product pelo id

    if (!product) {
      //Verifica se o produto não existe
      throw new AppError("Product not found");
    }

    const productExist = await repository.findByName(name); //Procura o nome do product

    if (productExist && name !== product.name) {
      //Verifica se algum product já possui esse nome
      throw new AppError("There is already one product with that name");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await repository.save(product);

    return product;
  }
}

export default UpdateProductService;
