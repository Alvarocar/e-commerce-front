import { Stripe, StripeCardElement } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useCallback, useEffect, useState } from 'react'

const useCardStripe = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [card, setCard] = useState<StripeCardElement | null>(null)
  const [error, setError] = useState<{message?: string}>({})

  useEffect(() => {
    loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
  .then(setStripe)
  }, [setStripe])

  useEffect(() => {
    if (stripe){
      const elements = stripe.elements()
      setCard(elements.create('card', { hidePostalCode: true }))
    }
  }, [stripe, setCard])

  const handleError = useCallback((message: string | undefined) => {
    if (message)
      setError({message})
    setError({})
  }, [setError])

  const getToken = useCallback( async (card: StripeCardElement) => {
    if (!stripe) {
      throw new Error('The stripe is still generating')
    }
    try {
      const result = await stripe.createToken(card)
      if (result.error) {
        throw new Error('Something went wrong with Stripe. Please try again')
      }
      return result.token
    }
    catch {
      throw new Error('Something went wrong with Stripe. Please try again')
    }
  }, [stripe])

  return { stripe, card,  getToken, error, handleError }
}

export default useCardStripe