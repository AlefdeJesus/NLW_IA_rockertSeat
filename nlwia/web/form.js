import { server } from "./server.js";

const form = document.getElementById("form");
const url = document.getElementById("url");
const content = document.getElementById("content");

form.addEventListener("submit",async (e) => {
    e.preventDefault();//para não recarregar a página ao enviar o formulário
    content.classList.add("placeholder")
   const videoUrl = url.value;

   if(!videoUrl.includes("shorts")){
     return content.textContent = "O link deve ser um short do youtube", content.style.color = "red";
   }

  const [URL, params] = videoUrl.split("/shorts/");
  const [videoId] = params.split("?si");

  content.textContent = "Obtentendo o texto do áudio, aguarde...";

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando resumo, aguarde...";

  const summary = await server.post("/summary", {
   text:transcription.data.result,
 });

    content.textContent = summary.data.result;
    content.classList.remove("placeholder")
});