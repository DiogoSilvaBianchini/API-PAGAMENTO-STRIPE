import PropTypes from 'prop-types';
import './style.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext } from 'react';
import UserContext from '../../context/userContext';

const Card = ({id, title, price, img}) => {

  const {cart, setCart} = useContext(UserContext)
  
  const formatText = () => {
    const LimitChapter = 30
    return title.substring(0, LimitChapter) + '...'
  }

  const addCart = (id, title, price, img) => {
    const filter = cart.filter(product => id == product.id)
    if(filter.length > 0){
      const removeProduct = cart.filter(product => id !== product.id)
      filter[0].quantity += 1 
      const newList = [...removeProduct, ...filter]
      const orderList = newList.sort((a, b) => {
        if(a.title < b.title) return -1
        if(a.title > b.title) return 1
        return 0
    })
      setCart(orderList)
    }else{
      setCart(state => [...state, {id, title, price, img, quantity: 1}])
    }
  }

  return (
    <div className='card-container'>
        <div className="img-container">
            <img src={img ? `productImages/${img}` : "logo.webp"} alt="teclado gamer" />
        </div>
        <h2>{title ? formatText() : "Nome do produto"}</h2>
        <span>R$ {price ? Number(price) : "0.00"}</span>
        <button onClick={() => addCart(id, title, price, img)}><AddShoppingCartIcon /> <span>Comprar</span></button>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string,
}

export default Card