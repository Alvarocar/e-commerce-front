import { connect, ConnectedProps } from "react-redux"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { RootState } from "../../store/store"

const mapState = (state: RootState) => ({
  userToken: state.user.token
})

const connector = connect(mapState)

type ReduxProps = ConnectedProps<typeof connector>

interface Props extends ReduxProps {
  Component: React.ElementType
}

const PrivateRoute: React.FC<Props & RouteProps> = ({ Component, userToken, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      userToken !== null ? <Component {...props} /> : <Redirect to="/" />
    )}/>
  )
}

export default connector(PrivateRoute)