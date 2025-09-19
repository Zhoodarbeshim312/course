import { useState, type FC } from "react";
import scss from "./Registration.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Registration: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, signInWithGoogle, loginIn } = useAuth();
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const handleRegister = async () => {
    if (!agree) {
      alert("Сначала согласитесь с условиями");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      nav("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(`Ошибка регистрации: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={scss.Registration}>
      <div className="container">
        <div className={scss.content}>
          <h1>Регистрация</h1>
          <div className={scss.forms}>
            <div className={scss.form}>
              <label htmlFor="name">Имя</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                type="text"
                placeholder="Введите свое имя"
              />
            </div>
            <div className={scss.form}>
              <label htmlFor="address">Почта</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="address"
                type="email"
                placeholder="Введите свою почту"
              />
            </div>
            <div className={scss.form}>
              <label htmlFor="password">Пароль*</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Введите свой пароль"
              />
            </div>
            <div className={scss.check}>
              <input
                id="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree">Согласен с Условиями</label>
            </div>
            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Регистрация..." : "Регистрация"}
            </button>
            <div className={scss.lines}>
              <div className={scss.line}></div>
              <h3>Или</h3>
              <div className={scss.line}></div>
            </div>
            <div className={scss.btns}>
              <button
                onClick={() => signInWithGoogle()}
                className={scss.google}
              >
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
