import { useState } from 'react'
import FullScreenForm from '../FullScreenForm/FullScreenForm'
import LabelInput from '../LabelInput/LabelInput'
import PropTypes from 'prop-types'

const RegisterForm = ({registerScreen, setRegisterScreen}) => {
    const [body, setBody] = useState({name: "", email: "", password: "", fone: ""})

    const registerUser = async () => {
      const req = await fetch("http://localhost:8082/user", {
        headers: {"Content-Type":"Application/json"},
        method: "POST",
        body: JSON.stringify(body)
      })

      const res = await req.json()
      console.log(res)
    }

  return (
    <FullScreenForm active={registerScreen} desactive={setRegisterScreen}>
        <LabelInput title='Name' value={body.name} change={setBody} id={"name"} body={body}/>
        <LabelInput title='E-mail' value={body.email} change={setBody} id={"email"} body={body}/>
        <LabelInput title='Password' typeField='password' value={body.password} change={setBody} id={"password"} body={body}/>
        <LabelInput title='Fone' value={body.fone} change={setBody} id={"fone"} body={body}/>
        <button className='darkButton' onClick={registerUser}>Registrar</button>
        <button className='outLineButton' onClick={() => setRegisterScreen(false)}>Voltar</button>
    </FullScreenForm>
  )
}

RegisterForm.propTypes = {
    registerScreen: PropTypes.bool.isRequired,
    setRegisterScreen: PropTypes.func.isRequired
}

export default RegisterForm