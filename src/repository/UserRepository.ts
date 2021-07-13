import ECommerceAxios from '../api/ECommerceAxios'
const baseApi = "/api/v1"

export default class UserRepository {

  async signUp(username: string, password: string) {
    try {
      await ECommerceAxios.post(`${baseApi}/users/`, {
        username, password
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async logIn(username: string, password: string) {
    try {
      const token = await ECommerceAxios.post<{auth_token: string}>(`${baseApi}/token/login/`,
         { username, password })
      return token.data.auth_token
    } catch (e) {
      throw new Error(e.message)
    }
  }
}