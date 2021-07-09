import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAsyncLatestProducts, selectProduct } from "../../store/product"

const LatestProducts = () => {
  
  const { products }  = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (products.length > 0)
      return
    dispatch(getAsyncLatestProducts())
  }, [products.length, dispatch])

  return (
  <article >
    <section><h2>Latest Products</h2></section>
  </article>
)}

export default LatestProducts