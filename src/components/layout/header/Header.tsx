import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import scss from "./Header.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../faerBase";
import { useDispatch } from "react-redux";
import { clearClient, setClient } from "../../../toolkit/clientSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../toolkit";
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.clientReducer.client);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearClient());
      nav("/");
    } catch (error: any) {
      alert(`Ошибка выхода: ${error.message}`);
    }
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
              <button onClick={() => handleLogout()}>
                {client.displayName}
                <IoLogInOutline
                  style={{
                    fontSize: "20px",
                  }}
                />
              </button>
            ) : (
              <>
                <Link to="/sign">Войти</Link>
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
      </div>
    </section>
  );
};

export default Header;
