import './style.css'
import PropTypes from "prop-types"

const LabelInput = ({title, typeField, value, change, body, id}) => {
  
  const changed = (e) => {
    if(!body){
      change(e.target.value)
    }else{
      const newBody = {...body}
      newBody[id] = e.target.value
      change(newBody)
    }
  }
  
  return (
    <label className="input-label" htmlFor={id}>
        <span>{title}:</span>
        <input 
            id={id}
            type={typeField ? typeField : "text"} 
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