import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaStar,
  FaImage,
  FaMicrophone,
  FaPaperclip,
  FaVideo,
  FaUserAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import {
  IoCallSharp,
  IoChatbubbleEllipses,
  IoHelpCircle,
} from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import { useModal } from "../../../store/useModal";
import styles from "./ChatProfile.module.scss";
import UserProfile from "./UserProfile";
import { useAuth } from "../../../context/AuthContext";
import Rate from "../../ui/Rate";
type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
  lastMessage: string;
  lastTime: string;
};

const ChatProfile = () => {
  const { logout } = useAuth();
  const { modalBool, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<
    "profile" | "chats" | "courses" | "rate" | "settings"
  >("chats");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatsList, setShowChatsList] = useState(true);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Друзья навеки",
      avatar:
        "https://img.freepik.com/premium-photo/group-people-jumping-sunset_777271-27830.jpg",
      messages: [
        { id: 1, text: "Привет ребята!", sender: "other", time: "15:25" },
        {
          id: 2,
          text: "Если вам надо фотки или данные поменять они в ChatProfile.tsx 52 строка",
          sender: "me",
          time: "15:25",
        },
      ],
      lastMessage: "Привет ребята!",
      lastTime: "Сегодня, 15:25",
    },
    {
      id: 2,
      name: "Однокурсники",
      avatar:
        "https://img.freepik.com/free-photo/group-young-people-raising-hands-outdoors_23-2149171881.jpg",
      messages: [
        { id: 1, text: "Рад видеть вас", sender: "other", time: "12:55" },
      ],
      lastMessage: "Рад видеть вас",
      lastTime: "Вчера, 12:55",
    },
    {
      id: 3,
      name: "Девчонки",
      avatar:
        "https://img.freepik.com/free-photo/group-of-girls-smiling-at-camera_53876-13826.jpg",
      messages: [
        {
          id: 1,
          text: "какие планы на сегодня",
          sender: "other",
          time: "9:22",
        },
      ],
      lastMessage: "какие планы на сегодня",
      lastTime: "Сегодня, 9:22",
    },
    {
      id: 4,
      name: "Бека",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      messages: [{ id: 1, text: "Где ты?", sender: "other", time: "8:56" }],
      lastMessage: "Где ты?",
      lastTime: "Сегодня, 8:56",
    },
    {
      id: 5,
      name: "Ира",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      messages: [{ id: 1, text: "Хорошо!", sender: "other", time: "2:31" }],
      lastMessage: "Хорошо!",
      lastTime: "Сегодня, 2:31",
    },
    {
      id: 6,
      name: "Азамат",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      messages: [
        { id: 1, text: "Привет", sender: "other", time: "16:22" },
        { id: 2, text: "Доброе утро", sender: "me", time: "16:22" },
      ],
      lastMessage: "Привет",
      lastTime: "Вчера, 16:22",
    },
    {
      id: 7,
      name: "Бегимай",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      messages: [{ id: 1, text: "я dasdad", sender: "other", time: "12:22" }],
      lastMessage: "я dasdadя",
      lastTime: "Вчера, 12:22",
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<number>(chats[0].id);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileSidebarOpen(false);
        setShowChatsList(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedChatId]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: selectedChat.messages.length + 1,
      text: inputMessage.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage.text,
              lastTime: newMessage.time,
            }
          : chat
      )
    );
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
    if (isMobileView) setShowChatsList(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  console.log(modalBool);

  return (
    <div className={styles.chatProfile}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          {isMobileView && (
            <button
              className={styles.menuBtn}
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              <FaBars />
            </button>
          )}
          <h1 className={styles.logo}>Logo</h1>

          {!isMobileView && (
            <div className={styles.search}>
              <input type="text" placeholder="Поиск..." />
            </div>
          )}

          <div className={styles.actions}>
            <div className={styles.bell}>
              <GoBell />
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="profile"
              className={styles.avatar}
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* SIDEBAR */}
        <div
          className={`${styles.sidebar} ${isMobileView ? styles.mobile : ""} ${
            isMobileSidebarOpen ? styles.open : ""
          }`}
        >
          {isMobileView && (
            <button
              className={styles.closeBtn}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          )}
          <div className={styles.nav}>
            {[
              { key: "profile", icon: FaUserAlt, label: "Профиль" },
              { key: "chats", icon: IoChatbubbleEllipses, label: "Чат" },
              { key: "courses", icon: FaEnvelope, label: "Курсы" },
              { key: "rate", icon: FaStar, label: "Оценить" },
              { key: "settings", icon: IoMdSettings, label: "Настройки" },
            ].map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                className={`${styles.navItem} ${
                  activeTab === key ? styles.active : ""
                }`}
                onClick={() => setActiveTab(key as any)}
              >
                <Icon size={16} /> {label}
              </div>
            ))}
          </div>
          <div className={styles.footerNav}>
            <div key="Помощь" className={styles.footerItem}>
              <IoHelpCircle size={16} /> Помощь
            </div>
            <div
              onClick={() => {
                handleLogout();
                closeModal();
              }}
              key="Выйти"
              className={styles.footerItem}
            >
              <MdOutlineLogout size={16} /> Выйти
            </div>
          </div>
        </div>
        {activeTab === "chats" && (
          <>
            {(!isMobileView || showChatsList) && (
              <div className={styles.chatList}>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`${styles.chatItem} ${
                      selectedChatId === chat.id ? styles.active : ""
                    }`}
                    onClick={() => handleChatSelect(chat.id)}
                  >
                    <img src={chat.avatar} alt={chat.name} />
                    <div className={styles.chatInfo}>
                      <div className={styles.chatTop}>
                        <h3>{chat.name}</h3>
                        <span>{chat.lastTime}</span>
                      </div>
                      <p className={styles.lastMessage}>{chat.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(!isMobileView || !showChatsList) && selectedChat && (
              <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>
                  {isMobileView && (
                    <button
                      className={styles.backBtn}
                      onClick={() => setShowChatsList(true)}
                    >
                      <FaArrowLeft />
                    </button>
                  )}
                  <img src={selectedChat.avatar} alt={selectedChat.name} />
                  <div className={styles.info}>
                    <h2>{selectedChat.name}</h2>
                    <div className={styles.status}>
                      <span className={styles.dot}></span> В сети
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <IoCallSharp /> <FaVideo />{" "}
                    <PiDotsThreeOutlineVerticalLight />
                  </div>
                </div>

                <div className={styles.messages}>
                  {selectedChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${
                        msg.sender === "me" ? styles.me : styles.other
                      }`}
                    >
                      <div className={styles.bubble}>{msg.text}</div>
                      <span className={styles.time}>{msg.time}</span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputBar}>
                  <div className={styles.icons}>
                    <FaImage /> <FaPaperclip /> <FaMicrophone />
                  </div>
                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className={styles.sendBtn}
                    onClick={handleSendMessage}
                  >
                    ➤
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === "profile" && <UserProfile />}
        {activeTab === "rate" && <Rate />}
      </div>
    </div>
  );
};

export default ChatProfile;
