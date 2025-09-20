import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaFacebook, FaStar } from "react-icons/fa6";
import scss from "./Header.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../faerBase";
import { useDispatch } from "react-redux";
import { clearClient, setClient } from "../../../toolkit/clientSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../toolkit";
import { IoChatbubbleEllipses, IoHelpCircle } from "react-icons/io5";
import loginImg from "../../../assets/images/signImg.svg";
import { FcGoogle } from "react-icons/fc";
import { CgClose } from "react-icons/cg";
import { useAuth } from "../../../context/AuthContext";
import { GoBell } from "react-icons/go";
import profileIcon from "../../../assets/images/profileIcon.png";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const { signInWithGoogle, loginIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const [modalLogin, setModalLogin] = useState<boolean>(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<boolean>(false);
  const client = useSelector((state: RootState) => state.clientReducer.client);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearClient());
      setProfile(false);
    } catch (error: any) {
      alert(`Ошибка выхода: ${error.message}`);
    }
  };

  const signGoogle = () => {
    signInWithGoogle();
    setModalLogin(false);
    nav("/");
  };

  const closeModal = (): void => {
    nav("registration");
    setModalLogin(false);
  };
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполни");
      return;
    }
    try {
      await loginIn(email, password);
      nav("/");
      setModalLogin(false);
      resetValue();
    } catch (error) {}
  };
  const resetValue = () => {
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setClient({
            uid: user.uid,
            displayName: user.displayName || undefined,
            email: user.email || undefined,
          })
        );
      } else {
        dispatch(clearClient());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <section className={scss.Header}>
      <div className="container">
        <div className={scss.header}>
          <h3 onClick={() => nav("/")}>Logo</h3>
          <div className={scss.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${scss.link} ${scss.active}` : scss.link
              }
            >
              Главная
            </NavLink>

            <NavLink
              to="/О нас"
              className={({ isActive }) =>
                isActive ? `${scss.link} ${scss.active}` : scss.link
              }
            >
              О нас
            </NavLink>

            <NavLink
              to="/курсы"
              className={({ isActive }) =>
                isActive ? `${scss.link} ${scss.active}` : scss.link
              }
            >
              Курсы
            </NavLink>

            <NavLink
              to="/контакты"
              className={({ isActive }) =>
                isActive ? `${scss.link} ${scss.active}` : scss.link
              }
            >
              Контакты
            </NavLink>
          </div>

          <div className={scss.sign}>
            {client ? (
              <button onClick={() => setProfile(true)}>
                <FaUserCircle />
              </button>
            ) : (
              <>
                <p onClick={() => setModalLogin(true)}>Войти</p>
                <button onClick={() => nav("/registration")}>
                  Присоединяйся <FaArrowRight />
                </button>
              </>
            )}
          </div>
          <div onClick={() => setOpen(!isOpen)} className={scss.burger}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        <div
          style={{
            transform: isOpen ? "translateX(0)" : "translateX(300px)",
          }}
          className={scss.menu}
        >
          <NavLink
            onClick={() => setOpen(!isOpen)}
            to="/"
            className={({ isActive }) =>
              isActive ? `${scss.link} ${scss.active}` : scss.link
            }
          >
            Главная
          </NavLink>
          <NavLink
            onClick={() => setOpen(!isOpen)}
            to="/О нас"
            className={({ isActive }) =>
              isActive ? `${scss.link} ${scss.active}` : scss.link
            }
          >
            О нас
          </NavLink>
          <NavLink
            onClick={() => setOpen(!isOpen)}
            to="/курсы"
            className={({ isActive }) =>
              isActive ? `${scss.link} ${scss.active}` : scss.link
            }
          >
            Курсы
          </NavLink>
          <NavLink
            onClick={() => setOpen(!isOpen)}
            to="/контакты"
            className={({ isActive }) =>
              isActive ? `${scss.link} ${scss.active}` : scss.link
            }
          >
            Контакты
          </NavLink>
          <>
            <Link to="/sign">Войти</Link>
            <button onClick={() => nav("/registration")}>
              Присоединяйся <FaArrowRight />
            </button>
          </>
        </div>
        <div
          style={{
            display: modalLogin ? "flex" : "none",
          }}
          className={scss.login}
        >
          <h4 onClick={() => setModalLogin(false)}>
            <CgClose />
          </h4>
          <img src={loginImg} alt="img" />
          <div className={scss.form}>
            <h1>Добро пожаловать</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Почта"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Пароль "
            />
            <a>Забыли пароль?</a>
            <button onClick={() => handleLogin()}>Ввойти</button>
            <p>
              У вас нет аккаунта?
              <span onClick={() => closeModal()}>Зарегистрироваться</span>
            </p>
            <div className={scss.lines}>
              <div className={scss.line}></div>
              <h3>Или</h3>
              <div className={scss.line}></div>
            </div>
            <div className={scss.btns}>
              <button onClick={() => signGoogle()} className={scss.google}>
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
        <div
          style={{
            display: profile ? "block" : "none",
          }}
          className={scss.profile}
        >
          <div className="container">
            <div className={scss.head}>
              <h1 onClick={() => setProfile(false)}>Logo</h1>
              <div className={scss.icons}>
                <div className={scss.bell}>
                  <GoBell />
                </div>
                <img src={profileIcon} alt="img" />
              </div>
            </div>
          </div>
          <hr />
          <div className={scss.view}>
            <div className={scss.nav}>
              <div className={scss.settings}>
                <p>
                  <FaUserAlt />
                  <span>Профиль</span>
                </p>
                <p>
                  <IoChatbubbleEllipses />
                  <span>Чат</span>
                </p>
                <p>
                  <FaEnvelope />
                  <span>Курсы</span>
                </p>
                <p>
                  <FaStar />
                  <span>Оценить</span>
                </p>
                <p>
                  <IoMdSettings />
                  <span>Настройки</span>
                </p>
              </div>
              <div className={scss.support}>
                <p>
                  <IoHelpCircle />
                  <span>Помощь</span>
                </p>
                <p onClick={() => handleLogout()}>
                  <MdOutlineLogout />
                  <span>Выйти</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
