import {pipeline} from "@xenova/transformers";


//import{transcriptionExemplo} from "./utils/transcription.js";

export async function transcribre(audio){
   // return transcriptionExemplo
    try {
        console.log("Transcrição em andamento..."); 
      const transcribre = await pipeline(
          "automatic-speech-recognition",
          "Xenova/whisper-small"
    )
        
        const transcription = await transcribre(audio,{
            chunk_length_s: 30,
            stride_length_s: 5,
            language: "portuguese",
            task:"transcribe",
        })
        console.log("Transcrição realizada com sucesso");
        return transcription?.text.replace("[Música]", "") 

    }catch (error) {
        console.log("Não foi possível realizar a transcrição: " + error);
        throw new Error(error);
    }
};