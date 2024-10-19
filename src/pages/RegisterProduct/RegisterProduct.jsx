import './style.css'
import { useState } from 'react'
import LabelInput from '../../components/LabelInput/LabelInput'
import FileInput from '../../components/FileInput/FileInput'
import EditCard from '../../components/EditCard/EditCard'
import SyncIcon from '@mui/icons-material/Sync';

const RegisterProduct = () => {
    const [body, setBody] = useState({title: "", price: "", describe: "", stock: "", img: ""})
    const [load, setLoad] = useState(false)
    const [preview, setPreview] = useState("")

    const handdleSubmit = async () => {
      const formData = new FormData()

      formData.set("title", body.title)
      formData.set("price", body.price)
      formData.set("describe", body.describe)
      formData.set("stock", body.stock)
      formData.set("img", body.img[0])

      setLoad(true)
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`, {
        method: "POST",
        body: formData
      })

      const res = await req.json()
      setLoad(false)
      console.log(res)
    }

  return (
    <div className="register-container">
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Adicione um novo produto</h2>
            <LabelInput title='Nome do produto' value={body.title} change={setBody} id={"title"} body={body}/>
            <LabelInput title='Preço' typeField={"number"} value={body.price} change={setBody} id={"price"} body={body}/>
            <LabelInput title='Descrição' value={body.describe} change={setBody} id={"describe"} body={body}/>
            <LabelInput title='Estoque' typeField={"number"} value={body.stock} change={setBody} id={"stock"} body={body}/>
            <FileInput title='Adicione uma imagem' body={body} change={setBody} id='img' preview={setPreview}/>
            <button className={load ? "loadBtn":"darkButton"} onClick={handdleSubmit}>{load ? <SyncIcon />:"Salvar produto"}</button>
        </form>
        <div className="preview-container">
            <EditCard title={body.title} price={Number(body.price)} preview={preview}/>
        </div>
    </div>
  )
}

export default RegisterProduct