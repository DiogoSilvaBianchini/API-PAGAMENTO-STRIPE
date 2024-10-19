import './style.css'
import PropTypes from "prop-types"

const LabelInput = ({title, typeField, value, change, body, id}) => {
  
  const changed = (e) => {
    if(typeField == "number"){
      numberField(e)
    }else{
      if(!body){
        change(e.target.value)
      }else{
        largeForm(e)
      }
    }    
  }

  const numberField = (e) => {
    if(!isNaN(e.target.value)){
      if(!body){
        change(e.target.value)
      }else{
        largeForm(e)
      }
    }
  }

  const largeForm = (e) => {
    const newBody = {...body}
    newBody[id] = e.target.value
    change(newBody)
  }
  
  const idField = Math.floor(Math.random() * 1E4)

  return (
    <label className="input-label" htmlFor={id + idField}>
        <span>{title}:</span>
        <input 
            id={id + idField}
            type={typeField ?  typeField == "number" ? "text": typeField : "text"} 
            value={value} 
            onChange={changed}
        />
    </label>
  )
}

LabelInput.propTypes = {
    title: PropTypes.string.isRequired,
    typeField: PropTypes.string,
    value: PropTypes.string,
    change: PropTypes.func,
    body: PropTypes.object,
    id: PropTypes.string
}

export default LabelInput