import cors from 'cors';
import express, { response } from 'express';
import { convert } from './convert.js';

import { download } from './download.js';
import { transcribre } from './transcribe.js';
import {summaryze} from './summaryze.js';


const app = express(); 
app.use(express.json());
app.use(cors()); 

app.get("/summary/:id", async (req,res)=>{
    try {
        //download retorna uma promessa (Promese) que foi configurada no arquivo de download    
      await download(req.params.id); 

      const audioConverted = await convert();
        console.log(audioConverted);
      const result = await transcribre(audioConverted);

      return  res.json({result:result})
    } catch (error) {
        console.log(error);
        return res.json({error:error})
    }
})

app.post("/summary", async (req,res)=>{
    try {
        const result = await summaryze(req.body.text);
        return res.json({result:result})
    } catch (error) {
        return res.json({error:error})
    }
})

app.listen(3333, () => console.log('Server is running on port 3333'));