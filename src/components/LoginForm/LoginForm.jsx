import { GoogleLogin } from '@react-oauth/google'
import FullScreenForm from '../FullScreenForm/FullScreenForm'
import LabelInput from '../LabelInput/LabelInput'
import {jwtDecode} from 'jwt-decode'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/userContext'


const LoginForm = ({loginScreen, setLoginScreen, setSimplifieldForm}) => {

    const [body, setBody] = useState({email: "", password: ""})
    const [error, setError] = useState(false)

    const {setToken, setBodyTemp, setCookie} = useContext(UserContext)

    

    const googleOnSucess = async ({credential}) => {
        const {name, email} = jwtDecode(credential)
        const req = await fetch("http://localhost:8082/user/oAuth/login", {
            headers: {"Content-Type":"Application/json"},
            method: "POST",
            body: JSON.stringify({email})
        })

        const res = await req.json()
        if(res.results){
            setToken(res.results)
            setCookie("token", res.results)
            setLoginScreen(false)
        }else{
            setLoginScreen(false)
            setSimplifieldForm(true)
            console.log(name, email)
            setBodyTemp({name, email})
        }
    }

    const googleOnFailed = () => {
        setError("Erro ao se conectar com o google, atualize a pagina e tente novamente.")
    }

    const loginIn = async () => {
        const req = await fetch("http://localhost:8082/user/login", {
            headers: {"Content-Type":"Application/json"},
            method: "POST",
            body: JSON.stringify(body)
        })

        const res = await req.json()
        if(!res.results){
            setError(res.msg)
        }else{
            setToken(res.results)
            setCookie("token", res.results)
            setLoginScreen(false)
        }
    }

    return (
        <FullScreenForm active={loginScreen} desactive={setLoginScreen} errorText={error ? error:""} closeClick={true}>
            <LabelInput title='E-mail' value={body.email} change={setBody} body={body} id={"email"}/>
            <LabelInput title='Password' typeField='password' value={body.password} change={setBody} body={body} id={"password"}/>
            <button className='darkButton' onClick={loginIn}>Login</button>
            <span className='small-text'>Ou</span>
            <GoogleLogin onSuccess={googleOnSucess} onError={googleOnFailed}/>
        </FullScreenForm>
    )
}

LoginForm.propTypes = {
    loginScreen:  PropTypes.bool.isRequired,
    setLoginScreen: PropTypes.func.isRequired,
    setSimplifieldForm: PropTypes.func.isRequired
}

export default LoginForm