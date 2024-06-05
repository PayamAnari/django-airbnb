import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import React, { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";

const ConversationPage = async () => {
  const userId = getUserId();

  if (!userId) {
     <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated ...</p>
     </main>
  }
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <ConversationDetail/>
    </main>
  )
}

export default ConversationPage;