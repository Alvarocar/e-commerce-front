import Layout from '../../layouts/MainLayout'
import LatestProducts from '../../components/containers/LatestProducts'
import HomePanel from '../../templates/panels/HomePanel'
import { useEffect } from 'react'
import styles from './styles.module.scss'

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Home | Djackets"
  }, [])
  return (
  <Layout>
    <main className={styles.container}>
      <HomePanel />
      <LatestProducts />
    </main>
  </Layout>
)}

export default HomePage