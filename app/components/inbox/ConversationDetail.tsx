"use client";

import useWebSocket from "react-use-websocket";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";

interface ConversationDetailProps {
  conversation: ConversationType;
  userId: string;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId
}) => {
  const myUser = conversation.users.find((user) => user.id == userId)
  const otherUser = conversation.users.find((user) => user.id != userId)

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
      share: false,
      shouldReconnect: () => true,
  },
)
  return (
   <div>
    <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
      <div className="w-[80%] py-4 px-6 rounded-xl bg-purple-900">
         <p className="font-bold text-gray-400">John Doe</p>
         <p className="text-white">hgdfvdc tgrfdf thgrfeds hytgrfedws fdf</p>
      </div>

      <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
         <p className="font-bold text-gray-500">Liam Doe</p>
         <p>hgdfvdc tgrfdf thgrfeds hytgrfedws fdf</p>
      </div>

    </div>

    <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
       <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 bg-gray-200 rounded-xl"
        />

        <CustomButton 
          label="Send"
          onClick={() => console.log("Clicked")}
          className="w-[160px]"
        />
    </div>

    </div>
  )
}

export default ConversationDetail;