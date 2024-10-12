import './style.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Card = () => {
  return (
    <div className='card-container'>
        <div className="img-container">
            <img src="/teclado_gamer.jpg" alt="teclado gamer" />
        </div>
        <h2>Teclado mecânico red dragon</h2>
        <span>R$ 202.90</span>
        <button><AddShoppingCartIcon /> <span>Comprar</span></button>
    </div>
  )
}

export default Card