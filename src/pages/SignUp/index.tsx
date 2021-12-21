import Layout from '../../layouts/MainLayout'
import SignUpForm from "../../components/forms/SignUpForm";
import styles from './styles.module.scss'

const SignUp = () => (
  <Layout>
    <main className={styles.container}>
      <SignUpForm />
    </main>
  </Layout>
)

export default SignUp
