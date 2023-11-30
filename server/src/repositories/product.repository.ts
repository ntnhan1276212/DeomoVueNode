import connection from "../db/index";
import Product from "../models/product.model";
import Tutorial from "../models/tutorial.model";
import productsRoutes from "../routes/products.routes";

interface IProductRepository {
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Product[]>;
  retrieveById(productId: number): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
  update(product: Product): Promise<number>;
  delete(productId: number): Promise<number>;
}

class ProductRepository implements IProductRepository {
  retrieveAll(searchParams: {name?: string, published?: boolean}): Promise<Product[]> {
    let query: string = "SELECT * FROM product";
    let condition: string = "";
  
    if (searchParams?.published)
      condition += "published = TRUE"

    if (searchParams?.name)
      condition += `LOWER(title) LIKE '%${searchParams.name}%'`

    if (condition.length)
      query += " WHERE " + condition;
  
    return new Promise((resolve, reject) => {
      connection.query<Product[]>(query, (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  save(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      connection.query(
          "INSERT INTO product (name, description) VALUES(?,?)",
          [product.name, product.description],
          (err: any, res: any) => {
            if (err) reject(err);
            else
              this.retrieveById(res.insertId)
                  .then((product) => resolve(product!))
                  .catch(reject);
          }
      );
    });
  }

  retrieveById(productId: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      connection.query<Product[]>(
          "SELECT * FROM product WHERE id = ?",
          [productId],
          (err: any, res: any) => {
            if (err) reject(err);
            else resolve(res?.[0]);
          }
      );
    });
  }

  update(product: Product): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
          "UPDATE product SET name = ?, description = ?  WHERE id = ?",
          [product.name, product.description, product.id],
          (err: any, res: any) => {
            if (err) reject(err);
            else resolve(res.affectedRows);
          }
      );
    });
  }

  delete(productId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query(
          "DELETE FROM product WHERE id = ?",
          [productId],
          (err: any, res: any) => {
            if (err) reject(err);
            else resolve(res.affectedRows);
          }
      );
    });
  }
}
export default new ProductRepository();