import { TextField } from "@material-ui/core"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { connect, ConnectedProps } from "react-redux"
import { useHistory } from "react-router"
import { CartItemDto } from "../../../model/Cart"
import { OrderDto } from "../../../model/Order"
import { cleanCart } from "../../../store/cart"
import { makeOrder } from "../../../store/order"
import { RootState } from "../../../store/store"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"
import ElementStripe from "../../ElementStripe"
import useCardStripe from "../../hooks/useCardStripe"
import styles from './styles.module.scss'

const mapToState = (state: RootState) => ({
  auth: state.user.token,
  cartItemsCount: state.cart.productsCount,
  cartItems: state.cart.products,
  orderStatus: state.order.status
})

const mapToDispatch = {
  submit: (data: OrderDto, auth: string) => makeOrder({data, auth}),
  clearCart: () => cleanCart()
}

const connector = connect(mapToState, mapToDispatch)

type ReduxProps = ConnectedProps<typeof connector>

interface Form {
  first: string
  last: string
  address: string
  zipcode: string
  email: string
  place: string
  phone: string
}

const ShippingForm: React.FC<ReduxProps> = (
  { auth, cartItemsCount, submit, cartItems, clearCart, orderStatus }) => {
  const history = useHistory()

  const { getToken, card, handleError, error } = useCardStripe()

  const { register, handleSubmit , formState: { errors } } = useForm<Form>()

  const onSubmit = useCallback((data: Form) => {
    if (card && auth) {
      getToken(card)
      .then(token => {
        handleError(undefined)
        const items: CartItemDto[] = cartItems.map(v => 
          ({ product: v.product.id, quantity: v.quantity, price: v.totalByProduct}))
        submit({
          first_name: data.first,
          last_name: data.last,
          address: data.address,
          email: data.email,
          zipcode: data.zipcode,
          place: data.place,
          phone: data.phone,
          items,
          stripe_token: token.id
        }, auth)
        .then( resp => {
          if(resp.meta.requestStatus === 'fulfilled') {
            clearCart()
            history.push('/cart/success')
          }
        })
      }).catch( (err: Error) => {
        handleError(err.message)
      })
    }
  }, [getToken, card, handleError, submit, cartItems, history, clearCart, auth])

  if (cartItemsCount <= 0 )
    return (
      <h2>No products to buy.</h2>
    )

  if (auth === null)
    return (
    <button 
      type="button"
      onClick={() => history.push('/log-in')}
      className={styles['log-in-button']} >Log-in for buying</button>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles['shipping-fieldset']}>
        <legend className={styles['shipping-fieldset-legend']}>Shipping Details</legend>
        <div className={styles['shipping-fieldset-fields']}>
          <TextField
            variant="outlined"
            label="First name"
            type="text"
            error={errors.first && true}
            { ...register('first', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="Address"
            type="text"
            error={errors.address && true}
            { ...register('address', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="Last name"
            type="text"
            error={errors.last && true}
            { ...register('last', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="Zip code"
            type="number"
            error={errors.zipcode && true}
            { ...register('zipcode', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="E-mail"
            type="text"
            error={errors.email && true}
            { ...register('email', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="Place"
            type="text"
            error={errors.place && true}
            { ...register('place', { required: true }) }
          />
          <TextField
            variant="outlined"
            label="Phone"
            type="number"
            error={errors.phone && true}
            { ...register('phone', { required: true }) }
          />
        </div>
      </fieldset>
      <fieldset className={styles['shipping-fieldset']}>
        <legend className={styles['shipping-fieldset-legend']}>Card</legend>
        <div className={styles['shipping-fieldset-fields']}>
          <ElementStripe stripeElement={card}/>
          {error.message && <p>{error.message}</p>}
        </div>
      </fieldset>
      { orderStatus === 'Loading' ? <DefaultLoader/> : <button className={styles['shipping-submit']} type="submit">Pay with Stripe</button>}
    </form>
  )
}

export default connector(ShippingForm)