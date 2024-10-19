import './style.css'
import { useEffect, useState } from "react"
import EditCard from "../../components/EditCard/EditCard"


const Produtos = () => {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [productList, setProductsList] = useState([])

    useEffect(() => {
        const httpRequest = async () => {
            const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`)
            const res = await req.json()
            if(res.results){
                setProducts(res.results)
                setProductsList(res.results)
            }
        }
        products.length == 0 && httpRequest()
    })

    const searchProduct = (find) => {
        setSearch(find)
        const filter = products.filter(product => product.title.toLowerCase().includes(find))
        setProductsList(filter)
    }

  return (
    <div className='products-container'>
        <div className="search">
            <label htmlFor='search'>
                <span>Procurar: </span>
                <input type="text" id='search' autoComplete='off' value={search} onChange={(e) => searchProduct(e.target.value)}/>
            </label>
        </div>
        <ul className='products-list-container'>
            {
                productList.length > 0 ? productList.map((product) => (
                    <li key={product._id}>
                        <EditCard id={product._id} title={product.title} price={product.price} img={product.img} updateList={setProductsList}/>
                    </li>
                )): <h2>Nenhum produto registrado.</h2>
            }
        </ul>
    </div>
  )
}

export default Produtos