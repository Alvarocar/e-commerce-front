import { useEffect } from 'react'
import { Button, TextField } from "@material-ui/core"
import { useState, useCallback } from 'react'
import { connect, ConnectedProps } from "react-redux"
import { toast } from "react-toastify"
import { ProductDto } from "../../../../model/Product"
import { addCartItem } from "../../../../store/cart"
import styles from './styles.module.scss'

const mapDispatch = {
  addCart: (product: ProductDto, quantity: number) => addCartItem({product, quantity})
}

const connector = connect(undefined, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

interface Props extends ReduxProps{
  product: ProductDto | null
}

const ShowProductDetail: React.FC<Props> = ({ product, addCart }) => {

  useEffect(() =>{
    if (product?.name)
      document.title = product.name + ' | Djacket'
  }, [product?.name])

  const [cart, setCart] = useState<{cartCount: string, error:string}>({cartCount: '1', error: ''})

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cart.error.length > 0)
      return
    if (product){
      addCart(product, Number(cart.cartCount))
      toast.success('The product was added to the cart', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      return
    }
  }, [addCart, cart, product])

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

export default connector(ShowProductDetail)