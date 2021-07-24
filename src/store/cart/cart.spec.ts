import CardReducer, {
  addCartItem,
  deleteCartItem,
  cleanCart,
  CartState,
  deleteFullCartItem
} from '../cart'

describe('cart reducer', () => {
  const initialState: CartState = {
    products: [{
      product: {
        description: 'a black jacket',
        get_absolute_url: 'winter/black_jacket',
        get_image: '',
        get_thumbnail: '',
        id: 1,
        name: 'Black Jacket'
      }
    }]
  }
})