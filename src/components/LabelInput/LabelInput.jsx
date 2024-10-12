import './style.css'
import PropTypes from "prop-types"

const LabelInput = ({title, typeField, value, change}) => {
  return (
    <label className="input-label">
        <span>{title}:</span>
        <input 
            type={typeField ? typeField : "text"} 
            value={value} 
            onChange={(e) => change(e.target.value)}
        />
    </label>
  )
}

LabelInput.propTypes = {
    title: PropTypes.string.isRequired,
    typeField: PropTypes.string,
    value: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired
}

export default LabelInput