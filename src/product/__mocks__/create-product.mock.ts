import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDTO } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDTO = {
    categoryId: categoryMock.id,
    name: 'Product Test',
    image: 'image-test',
    price: 10,
}