import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { RootState } from "../../../store/store"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"
import ProductCard from "../../cards/ProductCard"
import useQuery from "../../hooks/useQuery"
import styles from './styles.module.scss'

const mapState = (state: RootState) => ({
  products: state.product.searchedProducts,
  status: state.product.status
})

const connector = connect(mapState)

type ReduxProps = ConnectedProps<typeof connector>

const SearchProducts: React.FC<ReduxProps> = ({ products, status }) => {
 const query = useQuery().get('q')
 const history = useHistory()
  useEffect(() => {
    if (query === null)
      history.push('/')
  }, [query, history])

  if(status === 'Failed')
    return <h2>404</h2>
  if(status === 'Loading')
    return <DefaultLoader />
  return (
    <>
      <h1>Search</h1>
      <h3 className={styles.legend}>Search term: "{query}"</h3>
      <ul className={styles.productList}>
        {products.map(product => <li key={product.id}>
            <Link to={product.get_absolute_url}><ProductCard product={product}/></Link>
            </li>)}
      </ul>
    </>
  )
}

export default connector(SearchProducts)