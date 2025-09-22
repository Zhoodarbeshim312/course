import type { ReactElement } from "react";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Main from "./components/pages/main/Main";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/pages/landing/Landing";
import Registration from "./components/authentication/registration/Registration";
import { useModal } from "./store/useModal";
 
import { useModal } from "./store/useModal";
import { AnimatePresence, motion } from "framer-motion";
import ModalPage from "./components/pages/modalPage/ModalPage";

interface IRouter {
  id: number;
  path: string;
  element: ReactElement;
}

const App = () => {
  const { modalBool } = useModal();


  const router: IRouter[] = [
    {
      id: 1,
      path: "/",
      element: <Main />,
    },
    {
      id: 2,
      path: "/О нас",
      element: <Landing />,
    },
    {
      id: 3,
      path: "/registration",
      element: <Registration />,
    },
  ];


  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {modalBool ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Header />
            <Routes>
              {router.map((el) => (
                <Route path={el.path} element={el.element} key={el.id} />
              ))}
            </Routes>
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ModalPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
