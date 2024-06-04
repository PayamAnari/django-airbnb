import { getUserId } from "../lib/actions";
import Conversation from "../components/inbox/conversation";
import apiService from "../services/apiService";
import  {useState, useEffect} from 'react';

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be logged in to view your inbox.</p>
      </main>
    )
  }
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
       <h1 className="my-6 text-2xl">Inbox</h1>

       <Conversation />
       <Conversation />
       <Conversation />
    </main>
  )
} 

export default InboxPage;