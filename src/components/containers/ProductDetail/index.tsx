import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { ProductDao } from "../../../model/Product"
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import { getAsyncProduct, selectProduct } from "../../../store/product"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"
import styles from './styles.module.scss'

const ProductDetail: React.FC = () => {
  const { selectedProduct, status } = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const { category_slug, product_slug } = useParams<{category_slug: string, product_slug: string}>()
  useEffect(() => {
    dispatch(getAsyncProduct({ category_slug, product_slug}))
  }, [dispatch, category_slug, product_slug])
  if (status === 'Failed')
  return (<div><h1>404</h1></div>)
  if (status === 'Loading')
  return <DefaultLoader />
  
  return <ShowProductDetail product={selectedProduct}/>
}

interface Props {
  product: ProductDao | null
}

const ShowProductDetail: React.FC<Props> = ({ product }) => {
  const [cart, setCart] = useState<{cartCount: string, error:string}>({cartCount: '1', error: ''})
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Todo add to cart
  }, [])
  const handleCart = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cartCount = e.target.value
    if (Number(cartCount) <= 0) {
      setCart({cartCount, error: 'The value must be a positive number'})
      return
    }
    setCart({error: '', cartCount })

  }, [])
  return (
  <article className={styles.productDetail}>
    <section className={styles.upperSection}>
      <figure className={styles.figure}>
        <img src={product?.get_image} alt={product?.name} />
      </figure>
      <aside className={styles.aside}>
        <h3>Information</h3>
        <span><strong>Price: </strong>${product?.price}</span>
        <form 
          noValidate
          autoComplete="off" 
          className={styles.cartForm}
          onSubmit={handleSubmit}
          >
          <TextField
            label="Quantity"
            type="number"
            error={cart.error.length > 0}
            helperText={cart.error}
            variant="outlined"
            className="number"
            value={cart.cartCount}
            onChange={handleCart}
          />
          <Button type="submit">Add to cart</Button>
        </form>
      </aside>
    </section>
    <section className={styles.productDescription}>
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
    </section>
  </article>
)}

export default ProductDetail
