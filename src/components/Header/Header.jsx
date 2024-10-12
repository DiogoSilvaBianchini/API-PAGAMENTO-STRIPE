import './style.css'
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

const Header = ({auth}) => {
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
                        <NavLink className={({isActive}) => isActive ? "link-button active":"link-button"} to={"/login"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? "link-button active":"link-button"} to={"/register"}>Registre-se</NavLink>
                    </li>
                </>
            }
        </ul>
    </header>
  )
}

Header.propTypes = {
    auth: PropTypes.bool.isRequired
}

export default Header