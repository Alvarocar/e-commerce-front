import Layout from '../../layouts/MainLayout'
import ListProductsByCategory from '../../components/containers/ListProductsByCategory'
import styles from './styles.module.scss'

const ProductsByCategory = () => (
  <Layout>
    <main className={styles.container}>
      <ListProductsByCategory />
    </main>
  </Layout>
)

export default ProductsByCategory