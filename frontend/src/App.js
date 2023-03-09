
import './App.css';
import './normal.css';
import SvgComponent from './svg/SvgopenAI';
import { useEffect, useState } from 'react';
import ChatMessage from './components/ChatMessage';

function App() {

  const [prompt, setPrompt] = useState('');
  const [chatlog, setChatlog] = useState([]);
  const [models,setModels]= useState([]);
  const [currentModel,setCurrentModel] = useState('ada')
  
  console.log(models)
  useEffect(()=>{
    getEngines();
  },[])
  
  const handleClick = ()=>{
    setChatlog([]);
  }
   
  function getEngines(){
    fetch("http://localhost:4000/models").then(res=>res.json()).then(data=>setModels(data.models.data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatlogNew = [...chatlog,{ user: "me",message:`${prompt}` }]
    setChatlog(chatlogNew)
    console.log("submit");
    
    const messages = chatlogNew.map((message)=> message.message ).join("\n")
    await setPrompt("");

    
    
    const response = await fetch("http://localhost:4000",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel: `${currentModel}`
      })
    });
    const data = await response.json();
    setChatlog([...chatlogNew,{user:"gpt",message:`${data.message}`}])
    
  }


  return (
    <div className="App">
      <aside className='sidemenu' >
        <div
          className="side-menu-button"
          onClick={handleClick}
        >

          <span>+</span>
          New Chat
        </div>
        <div className='models'>
          <select onChange={(e)=>setCurrentModel(e.target.value)}>
          {models.map((model,index)=>(
            <option key={index} value={model.id}>
                  {model.id}
            </option>
           ))}
          </select>
           
        </div>
      </aside>
      <section className='chatbox'>



        <div className="chat-log">
         {chatlog.map((message,index)=>(<ChatMessage key={index} message={message}/>))}
          
          

        </div>



        <div className="chat-input-holder">
          <form
            onSubmit={handleSubmit}
          >
            <input
              rows="1"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="chat-input-textarea"

            />
          </form>
        </div>
      </section>

    </div>
  );
}

export default App;
