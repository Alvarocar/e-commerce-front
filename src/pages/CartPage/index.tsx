import Layout from '../../layouts/MainLayout'
import ShoppingCart from "../../components/containers/ShoppingCart";
import ShippingForm from "../../components/forms/ShippingForm";
import styles from './styles.module.scss'

const CartPage = () => (
  <Layout>
    <main className={styles.container}>
      <ShoppingCart />
      <ShippingForm />
    </main>
  </Layout>
  )

export default CartPage