import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { Link } from 'react-router-dom'
import './styles.scss'

const MainNavBar = () => (
  <AppBar position="sticky">
    <Toolbar className="toolbar">
          <Typography variant="h6">
            Djackets
          </Typography>
          <nav className="nav">
            <div className="nav-links-list">
              <Link className="nav-link" to="/">Summer</Link>
              <Link className="nav-link" to="/">Winter</Link>
            </div>
            <div className="nav-buttons-list">
              <Button className="nav-button" variant="contained">Log in</Button>
              <Button className="nav-button cart-button" variant="contained">Cart</Button>
            </div>
          </nav>
    </Toolbar>
  </AppBar>
)

export default MainNavBar