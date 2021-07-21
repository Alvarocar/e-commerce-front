import { ProductDto } from "./Product";

export interface CategoryDto {
  id: number
  name: string
  get_absolute_url: string
  products: ProductDto[]
}