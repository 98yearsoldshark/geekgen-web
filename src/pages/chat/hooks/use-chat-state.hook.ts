import {useState} from "react";
import {ChatMessage, ChatStatus} from "../types.ts";

export default function useChatState () {
  const storedChatMessages = sessionStorage.getItem('chat:messages');
  const initialChatMessages: ChatMessage[] = storedChatMessages ? JSON.parse(storedChatMessages) : [
    { role: 'assistant', content: '我是你的英语AI助手，有英语问题尽管问我呀！' }
  ];
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [chatStatus, setChatStatus] = useState<ChatStatus>('empty');
  const [chatInput, setChatInput] = useState<string>('');
  const [promptTabOpen, setPromptTabOpen] = useState<boolean>(true);

  function setEmpty (messages: ChatMessage[]) {
    setChatStatus('empty');
    setChatInput('');
    setChatMessages(messages);
    sessionStorage.setItem('chat:messages', JSON.stringify(messages));
  }

  function setGenerating (messages: ChatMessage[]) {
    setChatStatus('generating');
    setChatInput('');
    setChatMessages(messages);
    sessionStorage.setItem('chat:messages', JSON.stringify(messages));
  }

  function updateInput (text: string) {
    if (text === '') {
      setChatStatus('empty');
    } else {
      setChatStatus('inputting');
    }
    setChatInput(text);
  }

  function addInput (text: string) {
    setChatStatus('inputting');
    setChatInput(prev => prev + ` ${text} `);
  }

  function reversePromptTabOpen () {
    setPromptTabOpen(prev => !prev);
  }

  return {
    chatMessages, chatStatus, chatInput, promptTabOpen,
    setEmpty, setGenerating, updateInput, addInput,
    reversePromptTabOpen
  };

}