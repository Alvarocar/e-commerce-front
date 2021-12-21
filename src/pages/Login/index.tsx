import Layout from '../../layouts/MainLayout'
import LoginForm from '../../components/forms/LoginForm'
import styles from './styles.module.scss'

const Index = () => (
  <Layout>
    <main className={styles.container}>
      <LoginForm />
    </main>
  </Layout>
)

export default Index