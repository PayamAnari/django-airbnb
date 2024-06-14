"use client";

import useWebSocket, {ReadyState} from "react-use-websocket";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import  { useEffect, useState, useRef } from "react";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";
import Image from "next/image";
import { formatDateTime } from '@/app/components/forms/FormatDate';


interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userId,
  token,
  messages,
  conversation
}) => {
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
  const myUser = conversation.users?.find((user) => user.id == userId)
  const otherUser = conversation.users?.find((user) => user.id != userId)
  
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
      share: false,
      shouldReconnect: () => true,
  },
)

useEffect(() => {
   console.log("Connection state changed", readyState);
}, [readyState])

useEffect(() => {
   if (lastJsonMessage && typeof lastJsonMessage === "object" && "name" in lastJsonMessage && "body" in lastJsonMessage) {
     const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        created_at: new Date().toISOString(),
        conversationId: conversation.id
     }   

     setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
  }

  scrollToBottom();
},[lastJsonMessage]);

const sendMessage = async() => {
   sendJsonMessage({
       event: "chat_message",
       data: {
           body: newMessage,
           name: myUser?.name,
           sent_to_id: otherUser?.id,
           conversation_id: conversation.id
       }
   });

   setNewMessage("");

   setTimeout(() => {
    scrollToBottom()
}, 50);
}

const scrollToBottom = () => {
    if (messagesDiv.current) {
        messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
}
  return (
   <div>
    <div 
    ref={messagesDiv}
    className="max-h-[400px] overflow-auto flex flex-col space-y-4">

      {messages.map((message, index) => (
        <div
          key={index}
          className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-blue-300' : 'bg-black'}`}
           >
        <div className="flex gap-2">
        <Image
            src={message.created_by.avatar_url}
            width={30}
            height={30}
            alt="Landlord image"
            className="rounded-full "
         />
        <p className="font-bold text-gray-500">{message.created_by.name}</p>
        <p className="text-white">{message.body}</p>
       
        </div>
        <p className="text-xs text-gray-400 mt-2">{formatDateTime(message.created_at)}</p>

        </div>
       ))}
   
    {realtimeMessages.map((message, index) => (
       <div
        key={index}
        className={`w-[80%] py-4 px-6 rounded-xl ${message.name == myUser?.name ? "ml-[20%] bg-blue-300" : "bg-gray-500"}`}
       >
             <div className="flex gap-2">
        <Image
          src={message.created_by.avatar_url}
          width={30}
          height={30}
          alt="Landlord image"
          className="rounded-full "
         />
       <p className="font-bold text-gray-500">{message.name}</p>
       <p className="text-white">{message.body}</p>
       </div>
       <p className="text-xs text-gray-400 mt-2">{formatDateTime(message.created_at)}</p>
       </div>
    ))}

    </div>

    <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
       <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 bg-gray-200 rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <CustomButton 
          label="Send"
          onClick={sendMessage}
          className="w-[160px]"
        />
    </div>

    </div>
  )
}

export default ConversationDetail;