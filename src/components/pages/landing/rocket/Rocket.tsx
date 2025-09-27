import { useEffect, useState, type FC } from "react";
import scss from "./Rocket.module.scss";
import rocketImg from "../../../../assets/images/rocket.svg";
import axios from "axios";

interface IABOUTUS {
  id: number;
  title: string;
  authorBio: string;
  authorImage: string;
  titleAuthor: string;
}
const Rocket: FC = () => {
  const [aboutUs, setAboutUs] = useState<IABOUTUS[]>([]);
  const fetchData = async () => {
    try {
      const data = await axios.get("http://13.221.23.81/ru/about_us/");
      setAboutUs(data.data);
      return data.data;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={scss.Rocket}>
      <div className="container">
        {aboutUs.map((item) => (
          <div key={item.id} className={scss.rocket}>
            <h1>{item.title}</h1>
            <img src={rocketImg} alt="img" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rocket;
