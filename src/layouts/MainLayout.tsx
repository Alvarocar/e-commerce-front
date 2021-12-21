import React from 'react'
import { ToastContainer } from 'react-toastify'
import MainNavBar from "../templates/navbar/MainNavBar"
import 'react-toastify/dist/ReactToastify.css'
import DefaultFooter from '../templates/footers/DefaultFooter'
import styles from './styles.module.scss'

const MainLayout: React.FC = ( { children } ) => {
  return (
    <div id="app" className={styles.main}>
      <MainNavBar />
        { children }
      <DefaultFooter />
      <ToastContainer />
    </div>
  )
}

export default MainLayout