import type { ReactElement } from "react";
import Footer from "./components/layout/footer/Footer";
import Main from "./components/pages/main/Main";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Landing from "./components/pages/landing/Landing";
import Registration from "./components/authentication/registration/Registration";
import Header from "./components/layout/header/Header";
import Courses from "./components/pages/courses/Courses";
import Inputs from "./components/ui/Inputs";
import DetailsPage from "./components/pages/details/DetailsPage";

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
      path: "/details",
      element: <DetailsPage />,
    },
  ];

  const params = useParams();

  return (
    <div className="app">
      <Header />
      <Routes>
        {router.map((el) => (
          <Route path={el.path} element={el.element} key={el.id} />
        ))}
      </Routes>
      {params.id !== "/details" ? <Inputs /> : null}
      <Footer />
    </div>
  );
};

export default App;
