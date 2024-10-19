import PropTypes from 'prop-types'
import './style.css'
import { useState } from 'react'

const OptionsBtn = ({children}) => {
  const [btn, setBtn] = useState(true)
  const popUpActive = (e) => {
      let idButton = e.target
      
      if(idButton.className.includes("textButton")){
          idButton = idButton.parentElement.id
      }else{
          idButton = e.target.id
      }

      const popUp = document.querySelector(`#${idButton}`).parentElement.children[1]
      if(btn){
          popUp.style.display = "flex"
      }else{
          popUp.style.display = "none"
      }
      setBtn(!btn)
  }

  return (
    <div>
        <button className="icon-button" id={`btn-${Math.floor(Math.random() * 1E9)}`} onClick={popUpActive}>
            <span className={btn ? "textButton":"none"}>...</span>
            <p className={!btn ? "textButton":"none"}>X</p>
        </button>
        <ul className="pop-up">
           {children}
        </ul>
    </div>
  )
}

OptionsBtn.propTypes = {
  children: PropTypes.object.isRequired
}

export default OptionsBtn