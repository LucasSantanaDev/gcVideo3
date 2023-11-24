import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyDIM0_oJpXug5A1dFvW9gYxBkhcE68NYgE",
  authDomain: "gcvideo4.firebaseapp.com",
  projectId: "gcvideo4",
  storageBucket: "gcvideo4.appspot.com",
  messagingSenderId: "288493860568",
  appId: "1:288493860568:web:9b6f32cc09ed97eb4a49ad"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//------------------------------------------------------------------------------------------------------------------------------------------------


let nomeVideo = document.getElementById('txtNomeVideo')
let urlVideo = document.getElementById('txtUrlVideo')
let tagsVideo = document.getElementById('txtTagsVideo')
let catVideo = document.getElementById('txtCategoria')
let btEnviar = document.getElementById('btEnviar')
let aTags = []
const colecao = collection(db, "Videos");


function carregaArray() {
  aTags = tagsVideo.value.split(',').map(tag => tag.trim());
}


async function adicionarNovoVideo() {
  
  if(nomeVideo.value === "" || urlVideo.value === "" || tagsVideo.value === "" || catVideo.value === ""){
    alert('Todos os campos precisam estar preenchidos para realizar o upload do vídeo')
    return
   }
  
    carregaArray()

    const novoVideo = {
      nome: nomeVideo.value,
      url: urlVideo.value,
      tags: aTags,
      categoria: catVideo.value,
    };

    try {
      const novoDocRef = await addDoc(colecao, novoVideo);
      console.log("Novo documento criado com ID:", novoDocRef.id);
      limpaInputs()
    } catch (error) {
      console.error("Erro ao adicionar novo documento:", error);
    
  }

}

function limpaInputs() {
  nomeVideo.value = ""
  urlVideo.value = ""
  tagsVideo.value = ""
  catVideo.selectedIndex = 0
  aTags = []
  nomeVideo.focus
}

btEnviar.addEventListener('click', adicionarNovoVideo)