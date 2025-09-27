import type { ReactElement } from "react";
import Footer from "./components/layout/footer/Footer";
import Main from "./components/pages/main/Main";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/pages/landing/Landing";
import Registration from "./components/authentication/registration/Registration";
import Header from "./components/layout/header/Header";
import Courses from "./components/pages/courses/Courses";
import Inputs from "./components/ui/Inputs";

interface IRouter {
  id: number;
  path: string;
  element: ReactElement;
}

const App = () => {
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
    {
      id: 4,
      path: "/курсы",
      element: <Courses />,
    },
    {
      id: 5,
      path: "/детальная",
      element: <div>Details Page</div>, 
    },
  ];

  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <Routes>
        {router.map((el) => (
          <Route path={el.path} element={el.element} key={el.id} />
        ))}
      </Routes>
      {location.pathname !== "/детальная" && <Inputs />}
      <Footer />
    </div>
  );
};

export default App;
