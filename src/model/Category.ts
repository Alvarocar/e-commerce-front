import { ProductDao } from "./Product";

export interface CategoryDao {
  id: number
  name: string
  get_absolute_url: string
  products: ProductDao[]
}