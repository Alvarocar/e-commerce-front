import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getAsyncProductByCategory } from "../../../store/product"
import { RootState } from "../../../store/store"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"
import ProductCard from "../../cards/ProductCard"
import styles from './styles.module.scss'
const mapStateToProps = (state: RootState) => ({
  category: state.product.productsByCategory,
  status: state.product.status
})

const mapDispatchToProps = {
  fetchProducts: (category_slug: string) => getAsyncProductByCategory(category_slug)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

const ListProductsByCategory: React.FC<ReduxProps> = ({ category, fetchProducts, status }) => {
  const { category_slug } = useParams<{category_slug: string}>()
  useEffect(() => {
    document.title = category_slug + ' | Djackets'
    fetchProducts(category_slug)
  }, [category_slug, fetchProducts])
  if (status === 'Failed')
    return <h4>404</h4>
  if (status === 'Loading')
    return <DefaultLoader />
  return (
    <>
      <h1 className={styles.title}>{category_slug.toUpperCase()}</h1>
      <hr />
      <ul className={styles.productList}>
        {category?.products.map(product => (<li key={product.id}><Link to={product.get_absolute_url}><ProductCard product={product}/></Link></li>))}
      </ul>
    </>
  )
}

export default connector(ListProductsByCategory)
