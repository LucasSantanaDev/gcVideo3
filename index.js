import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs  
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";



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

//-----------------------------------------------------------------------------------------------------------------------------------

const btBuscar = document.getElementById('btBuscar')

async function fetchData(db) {
  const docsCol = collection(db, 'Videos');
  const docSnap = await getDocs(docsCol);
  const docList = docSnap.docs.map(doc => doc.data());
  return docList;
}

function extractVideoIdFromUrl(url) {
  const match = url.match(/youtube\.com.*(?:\/|v=)([^&]+)/i);
  if (match && match[1]) {
    return match[1];
  }
  return url;
}

let videos = await fetchData(db);

console.log(videos);



function loadVideos() {

  const playlist_area = document.querySelector(".playlist");

  videos.forEach((video, index) => {

    const div = document.createElement("div");
    const videoId = extractVideoIdFromUrl(video.url);

    div.innerHTML = `
   <div class="playlist-video ${index + 1 === 1 && "active"}">
     <iframe   
     width="560"
       height="315"
       class="allVideosPlaylist"      
       src="https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0"
       frameborder="0"
       allowfullscreen
     ></iframe>
     <label class="playlist-video-info">${video.nome}</label>
   </div>
 `;

    playlist_area.appendChild(div);
  });



  addOnClick();
}

const videosRef = collection(db, "Videos");


let buscaTxt = document.getElementById('txtBusca').value;

const searchResult = buscaVideos(videos, buscaTxt);


async function buscaVideos(tag) {
  const videosRef = collection(db, "Videos");
  const q = query(videosRef, where("tags", "array-contains", tag));

  try {
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map(doc => doc.data());
    return videos;
  } catch (error) {
    alert("1 - Erro ao buscar vídeos por tag:", error);
    return [];
  }
}

//console.log("Vídeos encontrados:", searchResult);
const video_main = document.querySelector(".main-video-content");

function addOnClick() {

  const playlist_video = document.querySelectorAll(".playlist-video");

  playlist_video.forEach((item, i) => {
    if (!i) {
      setVideo(video_main, item);
    }

    item.onclick = () => {
      playlist_video.forEach((video) => video.classList.remove("active"));
      item.classList.add("active");
      setVideo(video_main, item);
    };
  });
}
let count = 0
let imgLogo = document.getElementById('imgLog')
let span = document.getElementById('gcSpan')




function setVideo(video_main, item) {
  const videoId = extractVideoIdFromUrl(item.children[0].getAttribute("src"));
  const newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  video_main.children[0].setAttribute("src", newUrl);
  video_main.children[1].innerHTML = item.children[1].innerHTML;
  video_main.children[2].innerHTML = item.children[1].innerHTML;
}


loadVideos();

btBuscar.addEventListener('click', search)


function search() {
  const texto = document.getElementById('txtBusca').value;

  buscaVideos(texto)
    .then(videos => {
      console.log("Vídeos encontrados:", videos);

      let lista = document.getElementById('listaResult');
      lista.innerHTML = '';

      videos.forEach(video => {
        let a = document.createElement('button');
        a.textContent = video.nome;
        a.classList.add('btList'); // Adicione a classe desejada
        a.addEventListener('click', () => setVideoFromModal(video_main, video));
        let li = document.createElement('li');
        li.appendChild(a);
        lista.appendChild(li);
        openModal('dialogBusca');
      });
    })
    .catch(error => {
      console.error("Erro na busca:", error);
      alert("Erro na busca: " + error.message);
    });
}



function openModal(dlg) {
  const modal = document.getElementById(dlg);
  modal.showModal();
}

let btCloseModal = document.getElementById('btClose')

btCloseModal.addEventListener('click', closeModal)

function closeModal() {
  const modal = document.getElementById('dialogBusca');

  modal.close();

}


function setVideoFromModal(video_main, video) {
  const videoId = extractVideoIdFromUrl(video.url);
  const newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  video_main.children[0].setAttribute("src", newUrl);
  video_main.children[1].innerHTML = video.nome;
  closeModal();
}