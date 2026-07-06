import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
apiKey:"AIzaSyAE2VcJyqu01rtqlgVoMg634FFfTGxiRgc",
authDomain:"brain-orcamento.firebaseapp.com",
projectId:"brain-orcamento",
storageBucket:"brain-orcamento.firebasestorage.app",
messagingSenderId:"991853359315",
appId:"1:991853359315:web:b2270aab447a853b212426"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let produtos = [];

// 🔥 carregar produtos
async function carregar(){
const snap = await getDocs(collection(db,"dados"));

produtos = [];

snap.forEach(doc=>{
produtos.push(doc.data());
});

mostrar(produtos);
}

// 🔥 mostrar
function mostrar(lista){
const vitrine = document.getElementById("vitrine");
vitrine.innerHTML = "";

lista.forEach(p=>{
vitrine.innerHTML += `
<div class="card">
<img src="${p.linkImagem || ''}">
<div class="info">
<h3>${p.titulo || ""}</h3>
<p class="preco">💰 R$ ${p.valor || ""}</p>
</div>
</div>
`;
});
}

// 🔎 busca
document.getElementById("pesquisa").addEventListener("input",(e)=>{
const valor = e.target.value.toLowerCase();

const filtrado = produtos.filter(p =>
(p.titulo || "").toLowerCase().includes(valor)
);

mostrar(filtrado);
});

// ☰ menu lateral
window.toggleMenu = function(){
document.getElementById("menu").classList.toggle("ativo");
};

// 📦 abrir modal
window.abrirModal = function(secao){

const modal = document.getElementById("modal");
const titulo = document.getElementById("tituloModal");
const form = document.getElementById("formulario");

modal.classList.add("ativo");

if(secao==="lojista"){
titulo.innerText="Lojista";
form.innerHTML=`
<input placeholder="Nome loja">
<input placeholder="Telefone">
<button>Salvar</button>
`;
}

if(secao==="usuario"){
titulo.innerText="Usuário";
form.innerHTML=`
<input placeholder="Nome">
<input placeholder="Email">
<button>Salvar</button>
`;
}

if(secao==="adm"){
titulo.innerText="ADM";
form.innerHTML=`
<input placeholder="Senha">
<button>Entrar</button>
`;
}

if(secao==="graciele"){
titulo.innerText="Graciele";
form.innerHTML=`
<input placeholder="Nome">
<input placeholder="Contato">
<button>Salvar</button>
`;
}

if(secao==="produto"){
titulo.innerText="Produto";
form.innerHTML=`
<input placeholder="Nome produto">
<input placeholder="Preço">
<input placeholder="Imagem URL">
<button>Salvar</button>
`;
}
};

// ❌ fechar modal
window.fecharModal = function(){
document.getElementById("modal").classList.remove("ativo");
};

carregar();
