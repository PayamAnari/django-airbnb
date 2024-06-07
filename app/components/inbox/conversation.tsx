"use client"

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";
import Image from "next/image";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id != userId);

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl shadow-lg">  
        <div className="flex gap-2">
        {otherUser?.avatar_url && (

         <Image
            src={otherUser.avatar_url}
            width={30}
            height={30}
            alt="Landlord image"
            className="rounded-full ml-2"
          />
              )}
       <p className="text-xl"
       onClick={() => router.push(`/landlords/${otherUser?.id}`)}
      >
       {otherUser?.name}
       </p>
    </div>
    <p 
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className="text-airbnb-dark"
    >
        Go to conversation
    </p>
</div>
  )
}

export default Conversation;