import { Paper, Table, TableBody, TableCell,
         TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { ProductDto } from "../../../model/Product";
import { addCartItem, deleteCartItem, deleteFullCartItem } from "../../../store/cart";
import { RootState } from "../../../store/store";
import styles from './styles.module.scss'

const mapState = (state: RootState) => ({
  cartItems: state.cart.products,
  total: state.cart.total,
  productsCount: state.cart.productsCount
})

const mapDispatch = {
  addItem: (product: ProductDto) => addCartItem({product, quantity: 1}),
  deleteRow: (product: ProductDto) => deleteFullCartItem(product),
  deleteItem: (productId: number) => deleteCartItem({productId, quantity: 1})
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>


const ShoppingCart: React.FC<ReduxProps> = ({ 
  cartItems, total, productsCount, addItem, deleteRow, deleteItem }) => (
  <>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { cartItems.map( row => (
          <TableRow key={row.product.id}>
            <TableCell><Link to={row.product.get_absolute_url}>{row.product.name}</Link></TableCell>
            <TableCell>{row.product.price}</TableCell>
            <TableCell className={styles.quantityCeil}>
              <span>{row.quantity}</span>
              <div className="ceil-buttons">
                <button className="btn-increase" onClick={() => addItem(row.product)}>+</button>
                <button className="btn-decrease" onClick={() => deleteItem(row.product.id)}>-</button>
              </div>
              </TableCell>
            <TableCell>{row.totalByProduct.toFixed(2)}</TableCell>
            <TableCell><button onClick={() => deleteRow(row.product)} className={styles.btnDelete}>x</button></TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  </TableContainer>
  <section className={styles.summarySection}>
    <h3 className="section-title">Summary</h3>
    <p><b>$ {total.toFixed(2)}</b>, {productsCount} items</p>
  </section>
  </>
)

export default connector(ShoppingCart)