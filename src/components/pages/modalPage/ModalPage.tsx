import scss from "./ModalPage.module.scss";
import type { FC } from "react";
import { useState } from "react";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { IoMail } from "react-icons/io5";
import { CiSettings, CiStar } from "react-icons/ci";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useChat } from "../../../store/useChat";
import { useAuth } from "../../../context/AuthContext";

const ModalPage: FC = () => {
  const [messageText, setMessageText] = useState("");
  const { chats, activeChatId, setActiveChatId, sendMessage } = useChat();
  const { logout } = useAuth();

  const activeChat = chats.find((c) => c.id === activeChatId)!;

  const handleSend = () => {
    if (!messageText.trim()) return;
    sendMessage(messageText);
    setMessageText("");
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className={scss.modal}>
      <div className={scss.modal_top}>
        <h1 className={scss.logo}>Logo</h1>
        <input type="text" placeholder="Поиск" />
        <div className={scss.top_icons}>
          <IoMdNotificationsOutline className={scss.icon} />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2CNBKa4UmVa1eVFXMSyMtezTz9G18k3Iqg&s"
            alt="user"
            className={scss.avatar}
          />
        </div>
      </div>

      <div className={scss.modal_body}>
        <div className={scss.modal_left}>
          <div className={scss.left_top}>
            <h2>
              <FaUser /> Профиль
            </h2>
            <h2 className={scss.active}>
              <PiBuildingOfficeFill /> Чат
            </h2>
            <h2>
              <IoMail /> Курсы
            </h2>
            <h2>
              <CiStar /> Оценить
            </h2>
            <h2>
              <CiSettings /> Настройки
            </h2>
          </div>
          <div className={scss.left_bottom}>
            <h2>
              <AiFillQuestionCircle /> Помощь
            </h2>
            <h2 onClick={() => handleLogout()}>
              <IoIosLogOut /> Выйти
            </h2>
          </div>
        </div>

        <div className={scss.modal_middle}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`${scss.chat_item} ${
                chat.id === activeChatId ? scss.active : ""
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <img src={chat.avatar} alt={chat.name} />
              <div>
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
              <span>{chat.time}</span>
            </div>
          ))}
        </div>

        <div className={scss.modal_right}>
          <div className={scss.chat_header}>
            <img src={activeChat.avatar} alt={activeChat.name} />
            <div>
              <h3>{activeChat.name}</h3>
              <p className={scss.online}>В сети</p>
            </div>
            <div className={scss.header_actions}>
              <button>📞</button>
              <button>🎥</button>
              <button>⋮</button>
            </div>
          </div>

          <div className={scss.chat_messages}>
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`${scss.message} ${
                  msg.incoming ? scss.left : scss.right
                }`}
              >
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            ))}
          </div>

          <div className={scss.chat_input}>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Введите сообщение..."
            />
            <button onClick={handleSend}>🎤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
