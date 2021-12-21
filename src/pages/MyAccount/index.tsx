import Layout from '../../layouts/MainLayout'
import { connect, ConnectedProps } from 'react-redux'
import OrderList from '../../components/containers/OrderList'
import { logOut } from '../../store/user'
import styles from './styles.module.scss'

const mapDispatch = {
  logOut: () => logOut()
}

const connector = connect(undefined, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

const MyAccount: React.FC<ReduxProps> = ({ logOut }) => (
  <Layout>
    <main className={styles.container}>
      <section>
        <h1>My Account</h1>
      </section>
      <section className={styles.orders}>
        <OrderList />
      </section>
      <button className={styles['log-out-button']} onClick={() => logOut()}>Log-out</button>
    </main>
  </Layout>
)

export default connector(MyAccount)