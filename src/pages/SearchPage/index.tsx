import Layout from '../../layouts/MainLayout'
import SearchProducts from '../../components/containers/SearchProducts'
import styles from './styles.module.scss'

const SearchPage = () => (
  <Layout>
    <main className={styles.container}>
      <SearchProducts />
    </main>
  </Layout>
);

export default SearchPage
