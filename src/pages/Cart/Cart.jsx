import './style.css'
import { useContext } from 'react'
import UserContext from '../../context/userContext'
import OptionsBtn from '../../components/OptionsBtn/OptionsBtn'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom"

const Cart = () => {
    const {cart, setCart, setClientScret} = useContext(UserContext)
    const navigate = useNavigate()

    const totalSumCart = () => {
        const sum = cart.reduce((acc, curr) => {
            return acc + Number(curr.price * curr.quantity)
        }, 0)

        return sum.toFixed(2)
    }

    const addQuantity = (id, quantity) => {
        if(!isNaN(quantity)){
            const filter = cart.filter(product => id == product.id)
            const removeProduct = cart.filter(product => id !== product.id)
            filter[0].quantity = Number(quantity) 
            const newList = [...removeProduct, ...filter]

            const sorteList = newList.sort((a, b) => {
                if(a.title < b.title) return -1
                if(a.title > b.title) return 1
                return 0
            })

            setCart(sorteList)
        }
    }

    const removerItemCart = (id) => {
        const filter = cart.filter(product => product.id !== id)
        setCart(filter)
    }

    const httpReques = async () => {
        const idList = cart.map(element => {
            return element.id
        })
        console.log(idList)
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/payment/cart`, {
            headers: {"Content-Type":"application/json"},
            method: "POST",
            body: JSON.stringify({listProduct: idList})
        })

        const res = await req.json()

        if(res.status == 200){
            setClientScret(res.results)
            navigate("/checkout") 
        }
    }

  return (
    <div className='cart_container'>
        <ul className='productList'>
            {
                cart.length > 0 ? cart.map(product => (
                    <li key={product.id} className='horizontal-card-container'>
                        <div className="row">
                            <div className="image-box">
                                <img src={`productImages/${product.img}`} alt={product.title}/>
                            </div>
                            <h2>{product.title}</h2>
                        </div>
                        <label htmlFor="">
                            <span>Qtd</span>
                            <input type="text" value={product.quantity} onChange={(e) => addQuantity(product.id, e.target.value)}/>
                        </label>
                        <span>R$ {product.price.toFixed(2)}</span>
                        <OptionsBtn>
                            <li>
                                <button onClick={() => removerItemCart(product.id)}><DeleteForeverIcon/> Remover produto</button>
                            </li>
                        </OptionsBtn>
                    </li>
                )): <h2>Nenhum produto encontado</h2>
            }
        </ul>
        <div className="info-cart">
            <h2>Valor total: <span>R$ {totalSumCart()}</span></h2>
            <button className='darkButton' onClick={httpReques}>Comprar carrinho</button>
        </div>
    </div>
  )
}

export default Cart