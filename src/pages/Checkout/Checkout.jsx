import './style.css'
import {
  PaymentElement,
  // useStripe,
  // useElements
} from "@stripe/react-stripe-js";

const Checkout = () => {
  return (
    <form>
      <PaymentElement  options={{layout: "tabs"}}/>
      <button>Pagar</button>
    </form>
  )
}

export default Checkout