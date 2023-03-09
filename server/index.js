import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";



dotenv.config();



const app = express();

app.use(express.json());

const configuration = new Configuration({
    organization: "org-cSuRnrM12Nzmk9Zz4utHhePK",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors())

const port = 4000 || process.env.PORT;


app.get('/models', async (req,res)=>{
  try {
    const response = await openai.listEngines();
   
   res.json({
    models: response.data
   })
  } catch (error) {
    console.log(err)
  }
   
})


app.post('/',async (req,res)=>{

    try {
        const {message,currentModel}=req.body;
        console.log(currentModel)
        console.log(req.body.message)
        const response = await openai.createCompletion({
            model: `${currentModel}`,
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
          });
        
        
            res.json({
                message:response.data.choices[0].text
            })  
    } catch (err) {
        console.log(err)
    }
   

    
    
    
});





app.listen(port,(err)=>{
  if(!err){
    console.log("server is running on PORT " + port)
  }else{
    console.log(err);

  }

})