import { StripeElement } from '@stripe/stripe-js'
import { useEffect } from 'react'


interface Props {
  stripeElement: StripeElement | null
}

const ElementStripe: React.FC<Props> = ({ stripeElement }) => {

  useEffect(() => {
    if (stripeElement) {
      stripeElement.mount('#card-element')
    }
  }, [stripeElement])

  return (
  <label>Card
    <div id="card-element"></div>
  </label>
)}

export default ElementStripe