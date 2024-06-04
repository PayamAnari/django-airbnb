import { getUserId } from "../lib/actions";
import Conversation from "../components/inbox/conversation";
import apiService from "../services/apiService";
import React, {useState, useEffect} from 'react';

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

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be logged in to view your inbox.</p>
      </main>
    )
  }

  const conversations = await apiService.get("/api/chat/")
   console.log("response", conversations)
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
       <h1 className="my-6 text-2xl">Inbox</h1>
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