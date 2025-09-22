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
  const { closeModal } = useModal();
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
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/960px-Macaca_nigra_self-portrait_large.jpg",
      messages: [
        {
          id: 1,
          text: "Привет ребята! Как дела? Давно не виделись",
          sender: "other",
          time: "Сегодня, 15:25",
        },
        {
          id: 2,
          text: "Привет! Все отлично, работаем много",
          sender: "me",
          time: "Сегодня, 15:26",
        },
        {
          id: 3,
          text: "Может встретимся на выходных?",
          sender: "other",
          time: "Сегодня, 15:27",
        },
      ],
      lastMessage: "Может встретимся на выходных?",
      lastTime: "15:27",
    },
    {
      id: 2,
      name: "Однокурсники",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      messages: [
        {
          id: 1,
          text: "Рад видеть вас всех в нашем чате",
          sender: "other",
          time: "Вчера, 12:55",
        },
        {
          id: 2,
          text: "Взаимно! Надо чаще общаться",
          sender: "me",
          time: "Вчера, 13:10",
        },
      ],
      lastMessage: "Взаимно! Надо чаще общаться",
      lastTime: "13:10",
    },
    {
      id: 3,
      name: "Ира",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/960px-Macaca_nigra_self-portrait_large.jpg",
      messages: [
        {
          id: 1,
          text: "Хорошо! Увидимся завтра",
          sender: "other",
          time: "Сегодня, 14:31",
        },
        {
          id: 2,
          text: "Отлично, до встречи!",
          sender: "me",
          time: "Сегодня, 14:32",
        },
      ],
      lastMessage: "Отлично, до встречи!",
      lastTime: "14:32",
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
    if (isMobileView) {
      setShowChatsList(false);
    }
  };

  const handleBackToChatsList = () => {
    setShowChatsList(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        fontFamily: '"Inter", sans-serif',
        height: "100vh",
        background: "#fff",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 20px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {isMobileView && (
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <FaBars />
              </button>
            )}
            <h1
              onClick={() => closeModal()}
              style={{
                fontWeight: "700",
                fontSize: isMobileView ? "20px" : "28px",
                color: "#111827",
                margin: 0,
              }}
            >
              Logo
            </h1>
          </div>

          {!isMobileView && (
            <div
              style={{
                flex: 1,
                maxWidth: "400px",
                margin: "0 32px",
              }}
            >
              <input
                type="text"
                placeholder="Поиск..."
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  border: "1px solid #d1d5db",
                  borderRadius: "24px",
                  outline: "none",
                  fontSize: "14px",
                  transition: "border-color 0.2s ease",
                }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobileView ? "12px" : "16px",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                width: isMobileView ? "40px" : "48px",
                height: isMobileView ? "40px" : "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: isMobileView ? "16px" : "18px",
                color: "#6b7280",
                transition: "all 0.2s ease",
              }}
            >
              <GoBell />
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="profile"
              style={{
                width: isMobileView ? "40px" : "48px",
                height: isMobileView ? "40px" : "48px",
                borderRadius: "50%",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 84px)",
          position: "relative",
        }}
      >
        {isMobileView && isMobileSidebarOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 40,
            }}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div
          style={{
            width: isMobileView ? "280px" : "220px",
            background: "#fff",
            borderRight: "1px solid #e5e7eb",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: isMobileView ? "fixed" : "relative",
            top: isMobileView ? "84px" : 0,
            left: 0,
            height: isMobileView ? "calc(100vh - 84px)" : "100%",
            transform: isMobileView
              ? `translateX(${isMobileSidebarOpen ? "0" : "-100%"})`
              : "none",
            transition: "transform 0.3s ease",
            zIndex: 45,
            boxShadow: isMobileView ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none",
          }}
        >
          {isMobileView && (
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              <FaTimes />
            </button>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: isMobileView ? "40px" : "0",
            }}
          >
            {[
              { key: "profile", icon: FaUserAlt, label: "Профиль" },
              { key: "chats", icon: IoChatbubbleEllipses, label: "Чат" },
              { key: "courses", icon: FaEnvelope, label: "Курсы" },
              { key: "rate", icon: FaStar, label: "Оценить" },
              { key: "settings", icon: IoMdSettings, label: "Настройки" },
            ].map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                onClick={() => {
                  setActiveTab(key as any);
                  if (isMobileView) setIsMobileSidebarOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: activeTab === key ? "#3b82f6" : "transparent",
                  color: activeTab === key ? "white" : "#6b7280",
                  fontSize: "14px",
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { icon: IoHelpCircle, label: "Помощь" },
              { icon: MdOutlineLogout, label: "Выйти" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {activeTab === "chats" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              height: "100%",
              marginLeft: isMobileView ? "0" : "0",
            }}
          >
            {(!isMobileView || showChatsList) && (
              <div
                style={{
                  width: isMobileView ? "100%" : "350px",
                  background: "#fff",
                  borderRight: isMobileView ? "none" : "1px solid #e5e7eb",
                  overflowY: "auto",
                }}
              >
                {isMobileView && (
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #e5e7eb",
                      background: "#fff",
                      position: "sticky",
                      top: 0,
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Поиск чатов..."
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "20px",
                        outline: "none",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                )}

                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: isMobileView ? "16px 20px" : "16px 20px",
                      borderBottom: "1px solid #f3f4f6",
                      cursor: "pointer",
                      background:
                        chat.id === selectedChatId ? "#f8fafc" : "transparent",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      style={{
                        width: isMobileView ? "48px" : "50px",
                        height: isMobileView ? "48px" : "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        marginLeft: "12px",
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: isMobileView ? "15px" : "16px",
                            fontWeight: "600",
                            color: "#111827",
                            margin: 0,
                          }}
                        >
                          {chat.name}
                        </h3>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {chat.lastTime}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: isMobileView ? "200px" : "220px",
                        }}
                      >
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(!isMobileView || !showChatsList) && selectedChat && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 20px",
                    borderBottom: "1px solid #e5e7eb",
                    background: "#fff",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                >
                  {isMobileView && (
                    <button
                      onClick={handleBackToChatsList}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "#6b7280",
                        marginRight: "12px",
                      }}
                    >
                      <FaArrowLeft />
                    </button>
                  )}

                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    style={{
                      width: isMobileView ? "40px" : "48px",
                      height: isMobileView ? "40px" : "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      marginLeft: "12px",
                      flex: 1,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: isMobileView ? "16px" : "18px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                        marginBottom: "2px",
                      }}
                    >
                      {selectedChat.name}
                    </h2>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#10b981",
                          borderRadius: "50%",
                        }}
                      />
                      В сети
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: isMobileView ? "12px" : "16px",
                      fontSize: isMobileView ? "18px" : "20px",
                      color: "#3b82f6",
                    }}
                  >
                    <IoCallSharp style={{ cursor: "pointer" }} />
                    <FaVideo style={{ cursor: "pointer" }} />
                    <PiDotsThreeOutlineVerticalLight
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: isMobileView ? "16px 12px" : "20px",
                    overflowY: "auto",
                    background: "#f9fafb",
                  }}
                >
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        marginBottom: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          message.sender === "me" ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: isMobileView ? "85%" : "70%",
                          padding: "12px 16px",
                          borderRadius:
                            message.sender === "me"
                              ? "20px 20px 4px 20px"
                              : "20px 20px 20px 4px",
                          background:
                            message.sender === "me" ? "#3b82f6" : "#374151",
                          color: "white",
                          fontSize: isMobileView ? "14px" : "15px",
                          lineHeight: "1.4",
                          wordWrap: "break-word",
                        }}
                      >
                        {message.text}
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          marginTop: "4px",
                          marginLeft: message.sender === "me" ? "0" : "8px",
                          marginRight: message.sender === "me" ? "8px" : "0",
                        }}
                      >
                        {message.time}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: isMobileView ? "12px 16px" : "16px 20px",
                    borderTop: "1px solid #e5e7eb",
                    background: "#fff",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      color: "#9ca3af",
                      fontSize: "18px",
                    }}
                  >
                    <FaPaperclip style={{ cursor: "pointer" }} />
                    <FaImage style={{ cursor: "pointer" }} />
                  </div>

                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "24px",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />

                  <button
                    onClick={handleSendMessage}
                    style={{
                      width: "44px",
                      height: "44px",
                      border: "none",
                      background: "#3b82f6",
                      color: "white",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <FaMicrophone />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px",
              color: "#6b7280",
              marginLeft: isMobileView ? "0" : "0",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p style={{ fontSize: "16px", margin: 0 }}>
              Содержимое для раздела "{activeTab}" пока не реализовано.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatProfile;
