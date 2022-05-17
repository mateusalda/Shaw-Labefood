import React, { useState } from "react";
import axios from "axios";
import { goToHome, goToCadastro } from "../../routes/coordinator"
import { useNavigate } from "react-router-dom";
import { TextField, Box, Button, Divider } from "@mui/material";
import Logo from "../../Img/Logo_FutureEats.svg"
import { Botao, MainContainerLogin, P, Imagem, Titulo} from "./style";



export default function Login() {
    const [usuarioNome, setUsuarioNome] = useState()
    const [usuarioSenha, setUsuarioSenha] = useState()
    const navigate = useNavigate()


    const onUsuarioNome = (event) => {
        setUsuarioNome(event.target.value)

    }
    const onUsuarioSenha = (event) => {
        setUsuarioSenha(event.target.value)

    }
    const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/login"
    const fazendoLogin = (event) => {
        event.preventDefault()
        const body = {

            "email": usuarioNome,
            "password": usuarioSenha

        }
        axios.post(`${baseUrl}`, body)
            .then(resp => {
                console.log(resp.data)
                window.localStorage.setItem("token", resp.data.token)
                alert("bem vindo!")
                goToHome(navigate)

            })
            .catch(error => {
                alert("error ao cadastrar")
                console.log({ error })
            })

    }


    return (
        <MainContainerLogin>
            <Imagem src={Logo}/>
            <Titulo>
            <p> Entrar </p>
            </Titulo>    
            <Box component={"form"} onSubmit={fazendoLogin}>
                <TextField 
                    label="Email"
                    value={usuarioNome}
                    onChange={onUsuarioNome}
                    variant="outlined"
                    placeholder="email@emial.com"
                    sx={{width: "20.5rem",  marginBottom: "1rem"}}
                /> 
                <br/>
                <TextField 
                    label="Senha*"
                    type="password"
                    value={usuarioSenha}
                    onChange={onUsuarioSenha}
                    pattern={"^.{6,20}"}
                    placeholder="Minimo de 6 caracteres"
                    sx={{width: "20.5rem", marginBottom: "1rem"}}
                    /> 
                <br/>
                <Botao type={`submit`} 
                sx={{backgroundColor: "#e8222e", "&:hover": { backgroundColor: "#439ea1", color: "black" }, }}
                > Entrar </Botao>
            </Box>
            <div>
                <P onClick={()=>goToCadastro(navigate)}>Não possui cadastro? Clique aqui.</P>
            </div>
        </MainContainerLogin>
    )
}
