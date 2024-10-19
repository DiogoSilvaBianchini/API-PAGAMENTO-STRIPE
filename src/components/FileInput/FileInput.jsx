import './style.css'
import { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FileInput = ({title, change, value, id, body, preview}) => {
    const [previewImags, setPreviewImgs] = useState([])
    const [drag, setDrag] = useState(false)
    const [titleDragButton, setTittleDragButton] = useState(title)
    
    useEffect(() => {
        if(previewImags.length == 0){
            setDrag(false)
            setTittleDragButton(title)
        }
    },[previewImags, title])

    const addFile = (files) => {
        createPreview(files[0])

        const newBody = {...body}
        newBody[id] = files
        change(newBody)
    }

    const createPreview = (file) => {
        const render = new FileReader()

        render.onload = ((file) => {
            setPreviewImgs(state => [...state, {id: `img${Math.floor(Math.random() * 1E2)}`,blob:file.target.result}])
        })

        render.readAsDataURL(file)

    }

    const activePreview = (id, blob) => {
        activeClassPreviewButton(id)
        preview(blob)
    }

    const activeClassPreviewButton = (id) => {
        document.querySelectorAll(".activeButtonImage").forEach(element => {
            element.classList.remove("activeButtonImage")
        })
        const element = document.querySelector(`#${id}`)
        element.classList.add("activeButtonImage")
    }

    const pegando = (img) => {
        setDrag({id: img.id, index: img.index})
        setTittleDragButton("Remover Item")
    }

    const arrastando = (e) => {
        e.preventDefault()
    }
    
    const soltando = (e) => {
        e.preventDefault()
        
        const filterImgs = previewImags.filter(img => img.id !== drag.id)
        setPreviewImgs(filterImgs)
        const newList = removeImgBody(drag.index)
        const newBody = {...body}
        newBody[id] = newList
        change(newBody)
    }

    const cancelDrag = (e) => {
        e.preventDefault()
        setDrag(false)
        setTittleDragButton(title)
    }
    
    const removeImgBody = (index) => {
        const listImgs = Array.from(body.img)
        const dataTransfer = new DataTransfer()

        const newList = listImgs.map((img, i) => {
            if(index !== i){
                return img
            }
        })
        const listFilter = newList.filter(img => img && dataTransfer.items.add)
        
        listFilter.forEach(file => {
            dataTransfer.items.add(file)
        })

        return dataTransfer.files
    }
  return (
    <div className="container-file-input">
        {
            !drag ? 
                <>
                    <label htmlFor={id} className="input-file">
                        <span>{titleDragButton}</span>
                        <input type="file" multiple id={id} hidden onChange={(e) => addFile(e.target.files)} value={value}/>
                    </label>
                </>
            :<button id='deleteImg' className='deleteImg' onDrop={soltando} onDragOver={arrastando}><DeleteForeverIcon /> Arraste aqui para remover</button>
        }
        <ul className='list-preview-images'>
            {
                previewImags.length > 0 && previewImags.map(img => (
                    <li key={img.id} draggable onDragStart={() => pegando(img)} onDragEnd={cancelDrag}>
                        <button id={img.id} className='invisible' onClick={() => activePreview(img.id, img.blob)}>
                            <img src={img.blob} alt="preview da imagem do produto."/>
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

FileInput.propTypes = {
    title: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    value: PropTypes.array,
    id: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    preview: PropTypes.func
}

export default FileInput