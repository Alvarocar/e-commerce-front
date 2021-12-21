import { ProductDto } from '../../model/Product'
import cartReducer, {
  addCartItem,
  deleteCartItem,
  cleanCart,
  CartState,
  deleteFullCartItem
} from '../cart'


const initial_product = {
  description: 'a black jacket',
  get_absolute_url: 'winter/black_jacket',
  get_image: '',
  get_thumbnail: '',
  id: 1,
  name: 'Black Jacket',
  price: '10.45'
}

const initialState: CartState = {
  products: [{
    product: initial_product,
    quantity: 2,
    totalByProduct: 20.9
  }],
  productsCount: 2,
  total: 20.9
}


const test_product: ProductDto = {
  description: 'test description',
  get_absolute_url: 'summer/test',
  get_image: 'test.png',
  get_thumbnail: 'test_thumbnail.png',
  id: 2,
  name: 'jacket_test',
  price: '20.4'
}

describe('cart reducer', () => {
  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      productsCount: 0,
      total: 0
    })
  })

  it('should add a new product item', () => {
    const actual = cartReducer(initialState, addCartItem({
      product: test_product,
      quantity: 5
    }))
    expect(actual.products.length).toBe(2)
    expect(actual.productsCount).toBe(7)
    expect(actual.total).toBeCloseTo(122.9)
  })

  it('should reduce the product quantity', () => {
    const actual = cartReducer(initialState, deleteCartItem({
      productId: 1,
      quantity: 1
    }))
    expect(actual.productsCount).toBe(1)
    expect(actual.products.length).toBe(1)
  })

  it('should delete the product if the quantity to delete is equals to current quantity', () => {
    const actual = cartReducer(initialState, deleteCartItem({
      productId: 1,
      quantity: 2
    }))
    expect(actual.productsCount).toBe(0)
    expect(actual.total).toBeCloseTo(0)
    expect(actual.products.length).toBe(0)
  })

  it('should delete the product if the quantity to delete is greater than current quantity', () => {
    const actual = cartReducer(initialState, deleteCartItem({
      productId: 1,
      quantity: 8
    }))
    expect(actual.productsCount).toBe(0)
    expect(actual.total).toBeCloseTo(0)
    expect(actual.products.length).toBe(0)
  })
})