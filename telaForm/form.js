let nome = document.getElementById('nome');
let email = document.getElementById('email');
let password = document.getElementById('password');
let passwordConfirmation = document.getElementById('passwordConfirmation');
let descricao = document.getElementById('descricao');
let sexo = document.getElementsByName('sexo');
let experiencia = document.getElementsByName('experiencia');

let campos = document.querySelectorAll('.required');
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let spans = document.querySelectorAll('.span-required');

// let form = document.getElementById('form');
// let check = document.getElementsByName('experiencia');
// let sexo = document.getElementsByName("sexo")
// let text = document.getElementsByClassName(".textarea")

function enviarDados(){

    let data = {
        nome: nome.value,
        email: email.value,
        password: password.value,
        descricao: descricao.value,
        sexo: filtraSelecionado(sexo),
        experiencia: filtraSelecionado(experiencia)
    }

    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    listaUser.push(data)
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
}

function validate() {
    validarNome(data.nome);
    validarEmail(data.email);
    validarSenha(data.password);
    compararSenha(data.password, data.passwordConfirmation);
}

function filtraSelecionado(nodeList) {
    const valor = []
    for (let index = 0; index < nodeList.length; index++) {
        if (nodeList[index].checked === true) {
            valor.push(nodeList[index].value)
        }
    }
    return valor;
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    enviarDados();
});

// Vai alterar a cor da borda e mostrar o erro
function setError(index){
    campos[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';
}

//Vai remover as mensagens de erro do form
function removerErro(index){
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

//Vai fazer a validação do nome
function validarNome(){
    if(campos[0].value.length < 3){
        setError(0);
    }else{
        removerErro(0);
        return true
    }
}

function validarEmail(){
     if(emailRegex.test(campos[1].value)){
        removerErro(1);
        return true
    }else{
        setError(1);
    }
}

function validarSenha(){
    if(campos[2].value.length < 8){
        setError(2);
    }else{
        removerErro(2);
        compararSenha();
        return true
    }
}

function compararSenha(){
    if(campos[2].value == campos[3].value && campos[3].value.length >= 8){
        removerErro(3);
        return true
    }else{
        setError(3);
    }
}

