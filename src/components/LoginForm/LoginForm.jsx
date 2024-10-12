import './style.css'
import { useState } from "react"
import LabelInput from "../LabelInput/LabelInput"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className="login-screen">
        <form action="">
            <div className="apresentaion">
                <img src="logo.webp" alt="Logo com os dizeres HAPPY CART" />
                <h2>Bem-vindo</h2>
                <span>A forma mais rápida de compras!</span>
            </div>
            <LabelInput title='E-mail' value={email} change={setEmail}/>
            <LabelInput title='Password' typeField='password' value={password} change={setPassword}/>
            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginForm