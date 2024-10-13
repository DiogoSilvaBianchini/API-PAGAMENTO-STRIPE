import './style.css'
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"
import { useState } from 'react'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import SimplifieldForm from '../SimplifieldForm/SimplifieldForm'

const Header = ({auth}) => {
    const [loginScreen, setLoginScreen] = useState(false)   
    const [registerScreen, setRegisterScreen] = useState(false)   
    const [simplifieldForm, setSimplifieldForm] = useState(false)   

  return (
    <header className='header-container'>
        <Link to={"/"}>
            <img src="/logo.webp" alt="Logo com os dizeres HAPPY CART"/>
        </Link>
        <ul>
            {
                auth ? 
                <>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "link-button active":"link-button"} to={"/perfil"}>Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "link-button active":"link-button"} to={"/cart"}>Carrinho</NavLink>  
                    </li>
                </>:
                <>
                    <li>
                        <button className={"text-button"} onClick={() => setLoginScreen(true)}>Login</button>
                    </li>
                    <li>
                    <button className={"text-button"} onClick={() => setRegisterScreen(true)}>Registrar-se</button>
                    </li>
                </>
            }
        </ul>
        <LoginForm loginScreen={loginScreen} setLoginScreen={setLoginScreen} setSimplifieldForm={setSimplifieldForm}/>
        <RegisterForm registerScreen={registerScreen} setRegisterScreen={setRegisterScreen}/>
        <SimplifieldForm simplifieldForm={simplifieldForm} setSimplifieldForm={setSimplifieldForm} loginScreen={setLoginScreen}/>
    </header>
  )
}

Header.propTypes = {
    auth: PropTypes.string.isRequired
}

export default Header