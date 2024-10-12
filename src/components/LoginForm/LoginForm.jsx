import './style.css'
import { useRef, useState } from "react"
import LabelInput from "../LabelInput/LabelInput"
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import PropTypes from 'prop-types';

const LoginForm = ({active, setLoginScreen}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const containerRef = useRef()

    const googleOnSucess = ({credential}) => {
      const {email} = jwtDecode(credential)
      console.log(email)
    }

    const googleOnFailed = (err) => {
      console.log(err)
    }


    const closeLoginWindow = () => {
      setLoginScreen(false)
    }
  return (
    <div className={active ? "login-screen":"none"} onClick={closeLoginWindow} ref={containerRef}>
        <form action="">
            <div className="apresentaion">
                <img src="logo.webp" alt="Logo com os dizeres HAPPY CART" />
                <h2>Bem-vindo</h2>
                <span>A forma mais rápida de compras!</span>
            </div>
            <LabelInput title='E-mail' value={email} change={setEmail}/>
            <LabelInput title='Password' typeField='password' value={password} change={setPassword}/>
            <button>Login</button>
            <span>Ou</span>
            <GoogleLogin onSuccess={googleOnSucess} onError={googleOnFailed}/>
        </form>
    </div>
  )
}

LoginForm.propTypes = {
  active: PropTypes.bool.isRequired,
  setLoginScreen: PropTypes.func.isRequired
}

export default LoginForm