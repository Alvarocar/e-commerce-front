import ShoppingCart from "../../components/containers/ShoppingCart";
import ShippingForm from "../../components/forms/ShippingForm";
import styles from './styles.module.scss'

const CartPage = () => (
  <main className={styles.container}>
    <ShoppingCart />
    <ShippingForm />
  </main>
  )

export default CartPage