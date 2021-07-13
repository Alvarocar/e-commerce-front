import ECommerceAxios from '../api/ECommerceAxios'
const baseApi = "/api/v1/users/"

export default class UserRepository {

  async signUp(username: string, password: string) {
    try {
      await ECommerceAxios.post(baseApi, {
        username, password
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}