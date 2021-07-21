import ECommerceAxios from '../api/ECommerceAxios'
import { EOrder } from '../constants/EMessage'
import { OrderDto } from '../model/Order'

export default class OrderRepository {
  async makeOrder(data: OrderDto, auth: string) {
    try {
      await ECommerceAxios.post('/api/v1/checkout/', data, {
        headers: {
          Authorization: `Token ${auth}`
        }
      })
    } catch(e) {
      console.error(e)
      throw new Error(EOrder.FAILED_CHECKOUT)
    }
  }
}