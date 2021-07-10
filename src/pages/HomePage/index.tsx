import LatestProducts from '../../components/containers/LatestProducts'
import HomePanel from '../../templates/panels/HomePanel'
import { useEffect } from 'react'
import './styles.scss'

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Home | Djackets"
  }, [])
  return (
  <main className="container">
    <HomePanel />
    <LatestProducts />
  </main>
)}

export default HomePage