import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link } from "react-router-dom"
import { getOrderList } from "../../../store/order"
import { RootState } from "../../../store/store"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"

const mapState = (state: RootState) => ({
  auth: state.user.token,
  orders: state.order.myOrders,
  status: state.order.status,
})

const mapDispatch = {
  getList: (auth: string) => getOrderList({ auth }),
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

const OrderList: React.FC<ReduxProps> = ({ getList, auth, orders, status }) => {
  
  useEffect(() => {
    if (auth && orders.length <= 0) {
      getList(auth)
    }
  }, [auth, getList, orders.length])
  
  if (status === 'Loading')
    return <DefaultLoader />

  if (status === 'Failed')
    return <h2>Error</h2>
  return (
    <>
    <h2>My Orders</h2>
    { orders.map((order, i) => (
      <TableContainer key={order.id}>
        <h4>Order #{i+1}</h4>
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
          {<TableBody>
          { order.items.map( row => (
          <TableRow key={row.product.id}>
            <TableCell><Link to={row.product.get_absolute_url}>{row.product.name}</Link></TableCell>
            <TableCell>{row.product.price}</TableCell>
            <TableCell>
              {row.quantity}
            </TableCell>
            <TableCell>{row.price}</TableCell>
          </TableRow>
        )) }
          </TableBody>}
        </Table>
      </TableContainer>
    )) }
    </>
)}

export default connector(OrderList)