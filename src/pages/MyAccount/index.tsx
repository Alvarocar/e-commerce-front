import { connect, ConnectedProps } from 'react-redux'
import { logOut } from '../../store/user'
import styles from './styles.module.scss'

const mapDispatch = {
  logOut: () => logOut()
}

const connector = connect(undefined, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

const MyAccount: React.FC<ReduxProps> = ({ logOut }) => (
  <main className={styles.container}>
    <h1>My Account</h1>

  <button className={styles['log-out-button']} onClick={() => logOut()}>Log-out</button>
  </main>
)

export default connector(MyAccount)