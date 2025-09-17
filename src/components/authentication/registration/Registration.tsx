import type { FC } from "react";
import scss from "./Registration.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const Registration: FC = () => {
  return (
    <section className={scss.Registration}>
      <div className="container">
        <div className={scss.content}>
          <h1>Регистрация</h1>
          <div className={scss.forms}>
            <div className={scss.form}>
              <label htmlFor="name">Имя</label>
              <input id="name" type="text" placeholder="Введите свое имя" />
            </div>
            <div className={scss.form}>
              <label htmlFor="address">Почта</label>
              <input
                id="address"
                type="text"
                placeholder="Введите свою почту"
              />
            </div>
            <div className={scss.form}>
              <label htmlFor="password">Пароль*</label>
              <input
                id="password"
                type="text"
                placeholder="Введите свой пароль"
              />
            </div>
            <div className={scss.check}>
              <input id="agree" type="checkbox" />
              <label htmlFor="agree">Согласен с Условиями</label>
            </div>
            <button>Регистрация</button>
            <div className={scss.lines}>
              <div className={scss.line}></div>
              <h3>Или</h3>
              <div className={scss.line}></div>
            </div>
            <div className={scss.btns}>
              <button className={scss.google}>
                <FcGoogle />
                Google
              </button>
              <button className={scss.facebook}>
                <FaFacebook
                  style={{
                    color: "#1877f2",
                  }}
                />
                Fasebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
