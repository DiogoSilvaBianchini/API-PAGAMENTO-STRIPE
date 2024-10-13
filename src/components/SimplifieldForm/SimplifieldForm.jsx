import { useState } from "react"
import FullScreenForm from "../FullScreenForm/FullScreenForm"
import LabelInput from "../LabelInput/LabelInput"
import PropTypes from "prop-types"


const SimplifieldForm = ({simplifieldForm, setSimplifieldForm, loginScreen}) => {
    const [body, setBody] = useState({password: "", fone: ""})

    const backLoginScreen = () => {
        setSimplifieldForm(false)
        loginScreen(true)
    }

  return (
    <FullScreenForm active={simplifieldForm} desactive={setSimplifieldForm}>
        <LabelInput title="Password" body={body} change={setBody} id={"password"} typeField={"password"} value={body.password}/>
        <LabelInput title="Telefone" body={body} change={setBody} id={"fone"} value={body.fone} />
        <button className="darkButton">Registrar</button>
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