import './style.css'
import PropTypes from 'prop-types';

const FullScreenForm = ({children, active, desactive, errorText}) => {

    const closeLoginWindow = (e) => {
      if(e.target.className.includes("full-screen")){
        desactive(false)
      }
    }

    
  return (
    <div className={active ? "full-screen":"none"} onClick={closeLoginWindow} >
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="apresentaion">
                <img src="logo.webp" alt="Logo com os dizeres HAPPY CART" />
                <h2>Bem-vindo</h2>
                <span className='small-text'>A forma mais rápida de compras!</span>
                {errorText && <span className='error-text'>{errorText}</span>}
            </div>
            {
              children
            }
        </form>
    </div>
  )
}

FullScreenForm.propTypes = {
  children: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  desactive: PropTypes.func.isRequired,
  errorText: PropTypes.string
}

export default FullScreenForm