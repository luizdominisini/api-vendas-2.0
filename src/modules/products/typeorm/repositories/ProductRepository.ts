import dataSource from "../../../../shared/typeorm";
import Product from "../entities/Product";

//Criação de métodos
const ProductRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder("products")
      .where("products.name = :name", {
        name,
      })
      .getMany();
  },
});

export default ProductRepository;
