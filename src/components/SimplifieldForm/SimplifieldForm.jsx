import { useContext, useState } from "react"
import FullScreenForm from "../FullScreenForm/FullScreenForm"
import LabelInput from "../LabelInput/LabelInput"
import PropTypes from "prop-types"
import UserContext from "../../context/userContext"


const SimplifieldForm = ({simplifieldForm, setSimplifieldForm, loginScreen}) => {
    const [body, setBody] = useState({password: "", fone: ""})
    const { bodyTemp, setToken } = useContext(UserContext)
    const [error, setError] = useState("")
    
    const backLoginScreen = () => {
        setSimplifieldForm(false)
        loginScreen(true)
    }

    const registerPassword = async () => {

        const payLoad = {
            name: bodyTemp.name,
            email: bodyTemp.email,
            password: body.password,
            fone: body.fone
        }

        console.log(payLoad)

        const req = await fetch("http://localhost:8082/user", {
            headers: {"Content-Type":"Application/json"},
            method: "POST",
            body: JSON.stringify(payLoad)
        })

        const res = await req.json()

        if(res.results){
            setSimplifieldForm(false)

            const generateToken = await fetch("http://localhost:8082/user/login", {
                headers: {"Content-Type":"Application/json"},
                method: "POST",
                body: JSON.stringify({email: payLoad.email, password: payLoad.password})
            })

            const resToken = await generateToken.json()

            if(res.results){
                setToken(resToken.results)
                setError("")
                setBody({password: "", fone: ""})
            }else{
                setError(resToken.msg)
            }
        }else{
            setError(res.msg)
        }
    }

  return (
    <FullScreenForm active={simplifieldForm} desactive={setSimplifieldForm} errorText={error} closeClick={false}>
        <LabelInput title="Password" body={body} change={setBody} id={"password"} typeField={"password"} value={body.password}/>
        <LabelInput title="Telefone" body={body} change={setBody} id={"fone"} value={body.fone} />
        <button className="darkButton" onClick={registerPassword}>Registrar</button>
        <button className="outLineButton" onClick={backLoginScreen}>Voltar</button>
    </FullScreenForm>
  )
}

SimplifieldForm.propTypes = {
    simplifieldForm: PropTypes.bool.isRequired,
    setSimplifieldForm: PropTypes.func.isRequired,
    loginScreen: PropTypes.func.isRequired
}

export default SimplifieldForm