import React from 'react';
import { PhaseAgents } from '@/components/personal/chatbot/PhaseAgents';
import PageContainer from '@/components/layout/page-container';
import ChatInterface from '@/components/personal/chatbot/MainChatbot';
function Page() {
  return (
    <PageContainer>
      <div className='flex w-full flex-col space-y-4'>
        <ChatInterface />
        <PhaseAgents currentPhase='IDEATION' />
      </div>
    </PageContainer>
  );
}

export default Page;
