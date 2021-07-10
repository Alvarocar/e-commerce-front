import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import { getAsyncProduct, selectProduct } from "../../../store/product"
import DefaultLoader from "../../../templates/loaders/DefaultLoader"
import ShowProductDetail from './ShowProductDetail'

const ProductDetail: React.FC = () => {
  const { selectedProduct, status } = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()
  const { category_slug, product_slug } = useParams<{category_slug: string, product_slug: string}>()
  useEffect(() => {
    dispatch(getAsyncProduct({ category_slug, product_slug}))
  }, [dispatch, category_slug, product_slug])
  if (status === 'Failed')
  return (<div><h1>404</h1></div>)
  if (status === 'Loading')
  return <DefaultLoader />
  
  return <ShowProductDetail product={selectedProduct}/>
}



export default ProductDetail
