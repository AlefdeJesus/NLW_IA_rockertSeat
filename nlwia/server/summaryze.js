import { pipeline } from "@xenova/transformers";

//import {summaryExemplo} from "./utils/summary.js"

export async function summaryze(text){  
   
    //codigo que realiza o resumo
    try {
        //return summaryExemplo;

        console.log("Realizando o resumo...")

        const generator = await pipeline(
        "summarization",
        "Xenova/distilbart-cnn-12-6"
    );

    const output = await generator(text);
    console.log("Resumo realizado com sucesso");
    return output[0].summary_text;

    } catch (error) {
        console.log("Não foi possível realizar o resumo: " + error);
        throw new Error(error);
    }
}