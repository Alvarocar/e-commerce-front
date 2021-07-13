import { TextField } from "@material-ui/core"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { connect, ConnectedProps } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { doSignUp } from "../../../store/user"
import styles from './styles.module.scss'

const mapToDispatch = {
  signup: (username: string, password: string) => doSignUp({username, password})
}

const connector = connect(undefined, mapToDispatch)

type ReduxProps = ConnectedProps<typeof connector>

interface InputForm {
  username: string
  password: string
  confirmPassword: string
}

const SignUpForm: React.FC<ReduxProps> = ({ signup }) => {

  const history = useHistory()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputForm>()

  const onSubmit = useCallback((data: InputForm) => {
    signup(data.username, data.password)
    history.push('/log-in')
  }, [signup, history])
  
  return (
  <div className={styles.formCard}>
    <h1>Sign Up</h1>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField variant="outlined"
        label="Username"
        type="text"
        error={errors.username && true}
        helperText={
          errors.username?.type === 'minLength' && 'The username must have at least 4 characters'}
        {...register('username', { required: true, minLength: 4 })}
        />
      <TextField 
        label="Password"
        variant="outlined"
        type="password"
        error={errors.password && true}
        helperText={
          errors.password?.type === 'minLength' && 'The password must have at least 8 characters'}
        {...register('password', { required: true, minLength: 8 }) }
        />
      <TextField
        label="Confirm the Password"
        variant="outlined"
        type="password"
        error={errors.confirmPassword && true}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword', { required: true,
        validate: {
          equalsPasswords: val => val === watch('password') || "The passwords aren't equals"
        }})}/>
        <button type="submit">Sign Up</button>
    </form>
    <p>Or click <Link to="/log-in">here</Link> for log in!</p>
  </div>
)}

export default connector(SignUpForm)
