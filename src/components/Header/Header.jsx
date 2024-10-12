import './style.css'
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"
import LoginForm from '../LoginForm/LoginForm'
import { useState } from 'react'

const Header = ({auth}) => {

    const [loginScreen, setLoginScreen] = useState(false)

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
                        <NavLink className={({isActive}) => isActive ? "link-button active":"link-button"} to={"/register"}>Registre-se</NavLink>
                    </li>
                </>
            }
        </ul>
        <LoginForm active={loginScreen} setLoginScreen={setLoginScreen}/>
    </header>
  )
}

Header.propTypes = {
    auth: PropTypes.string.isRequired
}

export default Header