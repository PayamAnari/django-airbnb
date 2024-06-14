import { getUserId } from "../lib/actions";
import Conversation from "../components/inbox/conversation";
import apiService from "../services/apiService";
import React from "react";
import Image from "next/image";


export type UserType = {
   id: string;
   name: string;
   avatar_url: string;
}

export type ConversationType = {
   id: string;
   users: UserType[];
}

const InboxPage = async () => {
  const userId = await getUserId();
  const user = await apiService.get(`/api/auth/${userId}`);

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be logged in to view your inbox.</p>
      </main>
    )
  }

  const conversations = await apiService.get("/api/chat/")
  return (
    <main className="max-w-[800px] mx-auto px-6 pb-8 lg:mt-16 space-y-4">
      <div className="flex ">
      <Image
          src={user.avatar_url}
          width={80}
          height={80}
          alt="Landlord image"
          className="rounded-full px-4 py-4 "
         />
       <h1 className="my-6 text-2xl">{user.name ? (
          user.name
        ) : (
          "Guest"
        
       )} inbox</h1>
       </div>
      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation
             userId={userId}
             conversation={conversation}
             key={conversation.id}
          />
        )
      })}
      
    </main>
  )
} 

export default InboxPage;