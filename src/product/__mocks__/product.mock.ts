import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    id: 1327,
    name: 'Product 1',
    image: 'https://via.placeholder.com/150',
    price: 34.45,
    createdAt: new Date(),
    updatedAt: new Date(),
}