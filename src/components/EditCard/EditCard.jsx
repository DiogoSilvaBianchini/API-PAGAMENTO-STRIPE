import './style.css'
import PropTypes from "prop-types"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import OptionsBtn from '../OptionsBtn/OptionsBtn';
import { useRef } from 'react';

const EditCard = ({id, title, price, img, preview, updateList, button}) => {
    const titleRef = useRef("")
    
    const deleteProduct = async () => {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`, {
            headers: {"Content-Type":"application/json"},
            method: "DELETE"
        })

        const res = await req.json()

        updateList(res.results)
    }

    const formatText = () => {
        if(titleRef.current){
            const LimitChapter = 37

            const addPonits = titleRef.current.innerText.length > LimitChapter - 3 ? "...":""

            return title.substring(0, LimitChapter) + addPonits
        }
    }

  return (
    <div className='edit-card-container'>
        {button && <OptionsBtn>
            <li>
                <button onClick={deleteProduct}>Remover item</button>
            </li> 
        </OptionsBtn>}
        <div className="img-container">
            {
                preview ? <img src={preview} alt="teclado gamer" /> : <img src={img ? `productImages/${img}` : "logo.webp"} alt="teclado gamer" />
            }
        </div>
        <h2 className='text-card' ref={titleRef}>{title ? formatText() : "Titulo do produto"}</h2>
        <span>R$ {price ? Number(price).toFixed(2) : "0.00"}</span>
        <button className='darkButton'><AddShoppingCartIcon /> <span>Comprar</span></button>
    </div>
  )
}

EditCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string,
    preview: PropTypes.string,
    updateList: PropTypes.func,
    button: PropTypes.bool
}

export default EditCard