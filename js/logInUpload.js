let user = document.getElementById('txtUser')
let pass = document.getElementById('txtPass')
let aviso = document.getElementById('aviso')
let btAcessar = document.getElementById('btAcesso')

//SENHAS ESTABELECIDAS

const usuario = 'SUP'
const senha = '@Prod21$Ti'

function validaSenha(){
    if(user.value.toUpperCase() === usuario){
        if(pass.value === senha){
            window.location.href = "../pages/upload.html";            
        }else{
            aviso.innerText = "Senha inválida"
            aviso.style.display = 'inline'
        }
    }else{
        aviso.innerText = "Usuário inválido"
        aviso.style.display = 'inline'
    }
}

btAcessar.addEventListener('click', validaSenha)
