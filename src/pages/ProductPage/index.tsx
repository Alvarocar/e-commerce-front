import Layout from '../../layouts/MainLayout'
import ProductDetail from "../../components/containers/ProductDetail"
import styles  from './styles.module.scss'
const ProductPage = () => (
  <Layout>
    <main className={styles.container}>
      <ProductDetail />
    </main>
  </Layout>
)

export default ProductPage
