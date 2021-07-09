import LatestProducts from '../../components/LatestProducts'
import HomePanel from '../../templates/panels/HomePanel'
import './styles.scss'

const HomePage: React.FC = () => (
  <main className="container">
    <HomePanel />
    <LatestProducts />
  </main>
)

export default HomePage