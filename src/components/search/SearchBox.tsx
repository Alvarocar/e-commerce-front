import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.scss'

interface Props {
  dispatch: (queary: string) => void
}

interface FormValues {
  search: string
}

const SearchBox: React.FC<Props> = ({ dispatch }) => {
  const { register, handleSubmit } = useForm<FormValues>()
  const history = useHistory()
  const onSubmit = useCallback((data: FormValues) => {
    dispatch(data.search)
    history.push(`/search?q=${data.search}`)
  }, [dispatch, history])
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="search some jacket" className={styles.inputSearch} type='search' {...register('search', { required: true })}/>
      <button className={styles.submit}><SearchIcon className={styles.iconSearch} color="action"/></button>
    </form>
)}

export default SearchBox