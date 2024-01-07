import ytdl from 'ytdl-core';
import fs from 'fs';

export const download = (videoid) => new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoid;
    console.log("Downloading video with ID: " + videoid);
   
    ytdl(videoURL,{quality:"lowestaudio", filter:"audioonly"})
    .on("info", (info) => {
        //para verificar se realemnte é um short pelo tempo do video
        const seconds = info.formats[0].approxDurationMs / 1000;
        if(seconds > 120){
            throw new Error("Video maior que 120 segundos");
        }
        console.log(seconds)

    })
    .on("end", () => {
        console.log("Donwload realizado com sucesso");
        resolve();  
    })
    .on("error", (err) => {
        console.log("Não foi possível baixar o vídeo: " + err);
        reject(err);
    })
    .pipe(fs.createWriteStream("./tmp/video.mp4"));
});