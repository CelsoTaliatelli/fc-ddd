import Product from "../domain/entity/product";

export class ProductService {
    
    static increasePrice(products:Product[], percentage: number): Product[] {
        products.forEach(product => {
            product.changePrice((product.price * percentage)/ 100 + product.price)
        });
        return products;
    }
}