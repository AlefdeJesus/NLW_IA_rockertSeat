import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';



const filePath = "./tmp/video.mp4";
const outputPath = filePath.replace(".mp4", ".wav");


export const convert = () => new Promise((resolve, reject) => {

    console.log("Convertendo arquivo de video para audio....");

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(filePath)    
    .audioFrequency(16000)
    .audioChannels(1)
    .format("wav")
    .on("end", () => {
        const file = fs.readFileSync(outputPath);
        const fileDecoded = wav.decode(file); 

        const audioData =  fileDecoded.channelData[0];
        const floatArray = new Float32Array(audioData);

        console.log("Arquivo convertido com sucesso");
        resolve(floatArray);

        fs.unlinkSync(outputPath);
    })
    .on("error", (err) => {
        console.log("Não foi possível converter o arquivo: " + err);
        reject(err);
    }) 
    .save(outputPath);
});
