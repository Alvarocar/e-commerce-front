import { useEffect } from "react"
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getAsyncLatestProducts, selectProduct } from "../../../store/product"
import ProductCard from "../../cards/ProductCard"
import styles from './styles.module.scss'
 
const LatestProducts = () => {
  
  const { products }  = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (products.length > 0)
      return
    dispatch(getAsyncLatestProducts())
  }, [products.length, dispatch])
  return (
  <div >
    <section><h2 className={styles.title}>Latest Products</h2></section>
    <section className="products">
      <ul className={styles.productList}>
        { products.map( product => (<li key={product.id}><Link to="/"><ProductCard product={product}/></Link></li>)) }
      </ul>
    </section>
  </div>
)}

export default LatestProducts