import { saveToken } from "./auth.js";
import apiFetch from "./fetch.js";

const loginForm= document.querySelector('#formLogin')
loginForm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const btn = document.querySelector('#acceder')
btn.textContent = 'Cargando...'
btn.disabled = true
try{
const correo=document.querySelector('#loginCorreo').value
const contraseña=document.querySelector('#loginContraseña').value
const data= await apiFetch('/auth/login', 'POST' , {correo, contraseña})
const {token}= data 
saveToken(token)
window.location.href='/eventos.html' 
} catch (error){
    const errorEl = document.querySelector('#loginError')
    errorEl.textContent = error.message
    errorEl.style.display = 'block'
  }
finally{
  btn.textContent = 'Entrar'
btn.disabled = false

}

const loginRegistrer= document.querySelector('#formRegistrer')
loginRegistrer.addEventListenner('submit', async (e)=>{

})

const linkRegister= document.querySelector('#registrarse')

const linkLogin= document.querySelector('#irALogin')

