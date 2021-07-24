import ECommerceAxios from '../api/ECommerceAxios'
import { EOrder } from '../constants/EMessage'
import { OrderDto, OrderDtoWithProducts } from '../model/Order'

const tokenType = 'Token'

export default class OrderRepository {
  async makeOrder(data: OrderDto, auth: string) {
    try {
      await ECommerceAxios.post('/api/v1/checkout/', data, {
        headers: {
          Authorization: `${tokenType} ${auth}`
        }
      })
    } catch(e) {
      console.error(e)
      throw new Error(EOrder.FAILED_CHECKOUT)
    }
  }

  async listMyOrders(auth: string): Promise<OrderDtoWithProducts[]> {
    try {
      const resp = await ECommerceAxios.get<OrderDtoWithProducts[]>('/api/v1/orders/', {
        headers: {
          Authorization: `${tokenType} ${auth}`
        }
      })
      return resp.data
    } catch (e) {
      throw new Error(e.message)
    }
  }
}