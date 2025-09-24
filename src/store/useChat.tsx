import { create } from "zustand";

interface Message {
  id: number;
  text: string;
  time: string;
  incoming: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: number;
  setActiveChatId: (id: number) => void;
  sendMessage: (text: string) => void;
}

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Друзья навеки",
    lastMessage: "Привет ребята!",
    time: "Сегодня, 15:25",
    avatar: "https://i.pravatar.cc/40?img=1",
    messages: [
      { id: 1, text: "Привет!", time: "Today, 2:01pm", incoming: true },
      { id: 2, text: "Как твои дела?", time: "Today, 2:02pm", incoming: true },
    ],
  },
];

export const useChat = create<ChatState>((set, get) => ({
  chats: initialChats,
  activeChatId: initialChats[0].id,
  setActiveChatId: (id: number) => set({ activeChatId: id }),
  sendMessage: (text: string) => {
    if (!text.trim()) return;

    const chats = get().chats;
    const activeChatId = get().activeChatId;
    const activeChat = chats.find((c) => c.id === activeChatId);
    if (!activeChat) return;

    const newMessage: Message = {
      id: activeChat.messages.length + 1,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      incoming: false,
    };

    const updatedChats = chats.map((c) =>
      c.id === activeChatId
        ? {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: text,
            time: newMessage.time,
          }
        : c
    );

    set({ chats: updatedChats });
  },
}));
