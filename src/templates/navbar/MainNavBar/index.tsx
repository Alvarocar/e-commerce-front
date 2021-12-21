import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Menu, IconButton } from "@material-ui/core"
import { AccountCircle, List } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect, ConnectedProps } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import SearchBox from "../../../components/search/SearchBox";
import { searchAsyncProducts } from "../../../store/product";
import { RootState } from "../../../store/store";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './styles.scss'
import Routes, { DynamicRoutes as DRoutes } from "../../../constants/ERoutes";

const mapState = (state: RootState) => ({
  cartCount: state.cart.productsCount,
  token: state.user.token
})

const mapDispatch = {
  searchProduct: (query: string) => searchAsyncProducts(query) 
}

const connector = connect(mapState, mapDispatch)

type ReduxProps = ConnectedProps<typeof connector>

const MainNavBar: React.FC<ReduxProps> = ({ cartCount, searchProduct, token }) => {

  const history = useHistory()

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  const open = Boolean(anchor)
  return (
  <AppBar position="sticky">
    <Toolbar className="toolbar">
        <Link to="/">
          <Typography variant="h6">
            Djackets
          </Typography>
        </Link>
        <SearchBox dispatch={searchProduct}/>
        <IconButton onClick={handleMenu} color="inherit">
              <List />
        </IconButton>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"

          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <nav className="nav">
            <div className="nav-links-list">
              <Link className="nav-link" to={DRoutes.CATEGORY('summer')}>Summer</Link>
              <Link className="nav-link" to={DRoutes.CATEGORY('winter')}>Winter</Link>
            </div>
            <div className="nav-buttons-list">
              { token !== null ? 
              <Button
                className="nav-button"
                variant="contained"
                onClick={() => { history.push(Routes.MYACCOUNT) }}
                ><AccountCircleIcon/></Button> 
                : 
                <Button
                className="nav-button"
                variant="contained"
                onClick={() => { history.push(Routes.LOGIN) }}
                >Log in</Button>}
              <Button
                className="nav-button cart-button"
                variant="contained"
                onClick={() => { history.push(Routes.CART) }}
                >
                <ShoppingCartIcon/> Cart ({cartCount})
              </Button>
            </div>
          </nav>
        </Menu>
    </Toolbar>
  </AppBar>
)}

export default connector(MainNavBar)
