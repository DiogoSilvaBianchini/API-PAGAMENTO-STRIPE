import './style.css'
import { useRef, useState } from 'react'
import LabelInput from '../LabelInput/LabelInput'
import PropTypes from 'prop-types'

const RegisterForm = ({active, setRegisterWindow}) => {
    const [body, setBody] = useState({email: "", password: ""}) 
    const containerRef = useRef()

    const closeLoginWindow = () => {
        setRegisterWindow(false)
    }

    console.log(body)

  return (
    <div className={active ? "register-screen":"none"} onClick={closeLoginWindow} ref={containerRef}>
        <form action="">
            <div className="apresentaion">
                <img src="logo.webp" alt="Logo com os dizeres HAPPY CART" />
                <h2>Bem-vindo</h2>
                <span>A forma mais rápida de compras!</span>
            </div>
            <LabelInput title='E-mail' value={body.email} changeBody={setBody}/>
            <LabelInput title='Password' typeField='password' value={body.password} changeBody={setBody}/>
            <button>Login</button>
        </form>
    </div>
  )
}

RegisterForm.propTypes = {
    active: PropTypes.bool.isRequired,
    setRegisterWindow: PropTypes.func.isRequired
}

export default RegisterForm