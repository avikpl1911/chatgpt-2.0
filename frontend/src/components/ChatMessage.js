import React from 'react'
import SvgComponent from '../svg/SvgopenAI'

function ChatMessage({message}) {
  return (
    <div
      className={`chat-message ${message.user === "gpt" && "chatgpt"}`}
    >
      <div className="chat-message-center">
        <div
          className={`avatar ${message.user === "gpt" && "chatgpt"}`}
        >
           {message.user === "gpt" && (<SvgComponent />)}
        </div>

        <div className="message">
          {message.message}
        </div>

      </div>

    </div>
  )
}

export default ChatMessage
