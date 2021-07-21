import { TextField } from "@material-ui/core"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { connect, ConnectedProps } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { doLogin } from "../../../store/user"
import styles from './styles.module.scss'

const mapToDispatch = {
  login: (name: string, password: string) => doLogin({name, password})
}

const connector = connect(undefined, mapToDispatch)

type ReduxProps = ConnectedProps<typeof connector>

interface FormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC<ReduxProps> = ({ login }) => {
  
  const history = useHistory()
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit = useCallback( (data: FormInputs) => {
    login(data.username, data.password)
    .then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        history.push('/')
      }
    })
  }, [login, history])

  return (
  <div className={styles.login} onSubmit={handleSubmit(onSubmit)}>
    <h1>Log-in</h1>
    <form className={styles['login-form']}>
      <TextField
        type='text'
        label="Username"
        variant="outlined"
        {...register('username')}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        {...register('password')}
      />
      <button className={styles['login-form-submit']} type="submit">
        Log-in
      </button>
    </form>
    <p>Or click <Link to="/sign-up">here</Link> for sign up!</p>
  </div>
)}

export default connector(LoginForm)
