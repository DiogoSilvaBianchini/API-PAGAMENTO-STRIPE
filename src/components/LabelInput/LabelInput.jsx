import './style.css'
import PropTypes from "prop-types"

const LabelInput = ({title, typeField, value, change, changeBody}) => {
  
  const changed = (e) => {
    if(change){
      change(e.target.value)
    }else{
      changeBody[value] = e.target.value
    }
  }
  
  return (
    <label className="input-label">
        <span>{title}:</span>
        <input 
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
    value: PropTypes.string.isRequired,
    change: PropTypes.func,
    changeBody: PropTypes.func
}

export default LabelInput