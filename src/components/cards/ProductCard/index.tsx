import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { ProductDao } from "../../../model/Product"
import styles from './styles.module.scss'
interface Props {
  product: ProductDao
}

const ProductCard:React.FC<Props> = ({ product }) => (
  <Card className={styles.card}>
    <CardMedia
      component="img"
      alt={product.name || 'Jacket Product'}
      image={product.get_thumbnail}
      title={product.name}
      height="140"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
            {product.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
            {`$ ${product.price}`}
      </Typography>
    </CardContent>
  </Card>
)

export default  ProductCard