import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect, ConnectedProps } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import SearchBox from "../../../components/search/SearchBox";
import { searchAsyncProducts } from "../../../store/product";
import { RootState } from "../../../store/store";
import './styles.scss'

const mapState = (state: RootState) => ({
  cartCount: state.cart.productsCount
})

const mapDispatch = {
  searchProduct: (query: string) => searchAsyncProducts(query) 
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

const MainNavBar: React.FC<ReduxProps> = ({ cartCount, searchProduct }) => {
  const history = useHistory()
  return (
  <AppBar position="sticky">
    <Toolbar className="toolbar">
        <Link to="/">
          <Typography variant="h6">
            Djackets
          </Typography>
        </Link>
        <SearchBox dispatch={searchProduct}/>
          <nav className="nav">
            <div className="nav-links-list">
              <Link className="nav-link" to="/summer">Summer</Link>
              <Link className="nav-link" to="/winter">Winter</Link>
            </div>
            <div className="nav-buttons-list">
              <Button
                className="nav-button"
                variant="contained"
                onClick={() => { history.push('/log-in') }}
                >Log in</Button>
              <Button
                className="nav-button cart-button"
                variant="contained"
                onClick={() => { history.push('/cart') }}
                >
                <ShoppingCartIcon/> Cart ({cartCount})
              </Button>
            </div>
          </nav>
    </Toolbar>
  </AppBar>
)}

export default connector(MainNavBar)
