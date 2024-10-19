import './style.css'
import Card from '../../components/Card/Card'
import { useEffect, useState } from 'react'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const httpRequest = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`)
      const res = await req.json()
      setProducts(res.results)
    }

    httpRequest()
  }, [])


  return (
    <div className='home-container'>
      <ul className='products'>
        {
          products && products.map(product => (
            <li key={product._id}>
              <Card id={product._id} title={product.title} price={product.price} img={product.img}/>
            </li>
          ))
        }
      </ul>
      
    </div>
  )
}

export default Home