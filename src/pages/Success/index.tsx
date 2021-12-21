import Layout from '../../layouts/MainLayout'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.scss'

const SuccessPage = () => {
  const history = useHistory()
  return (
  <Layout>
    <main className={styles.main}>
      <section className={styles.section}>
        <h1>Thank you</h1>
        <p>Your order will be processed within 48 hours</p>
      </section>
      <button
        onClick={() => history.push('/')} 
        className={styles.button}
        >Back to Home</button>
    </main>
  </Layout>
)}

export default SuccessPage