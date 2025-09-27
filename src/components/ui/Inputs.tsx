import type { FC } from "react";
import { useState } from "react";
import scss from "./Inputs.module.scss";

const Inputs: FC = () => {
  const [email, setEmail] = useState("");

  return (
    <section className={scss.Inputs}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.content_text}>
            <div className={scss.text_box}>
              <h1>Присоединяйся к нам</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация
              </p>
            </div>
          </div>

          <div className={scss.content_input}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Твой Email"
              className={scss.email_input}
            />
            <button
              className={scss.subscribe_button}
              onClick={() => {
                if (email) {
                  alert(`Подписка оформлена для: ${email}`);
                  setEmail("");
                }
              }}
            >
              Подписка
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inputs;
