import scss from "./Hero.module.scss";
import heroCardIcon1 from "../../../../assets/images/heroCardIcon1.svg";
import heroCardIcon2 from "../../../../assets/images/heroCardIcon2.svg";
import heroCardIcon3 from "../../../../assets/images/heroCardIcon3.svg";
import { useModal } from "../../../../store/useModal";
import axios from "axios";
import { API_KEY } from "../../../../API";
import { useEffect, useState } from "react";
interface IHero {
  title: string;
  description: string;
  image: string;
}
interface IHighlite {
  id: number;
  home: number;
  title: string;
  iconka: string;
  description: string;
}
const Hero = () => {
  const { openModal } = useModal();
  const [data, setData] = useState<IHero | null>(null);
  const [dataHighlite, setDataHighlite] = useState<IHighlite[]>([]);
  const getHero = async () => {
    let res = await axios.get<IHero[]>(`${API_KEY}/home/`);
    setData(res.data[0]);
  };
  const getHighlite = async () => {
    let res = await axios.get<IHighlite[]>(`${API_KEY}/Highlight/`);
    setDataHighlite(res.data);
  };
  useEffect(() => {
    getHero();
    getHighlite();
  }, []);
  return (
    <section className={scss.Hero}>
      <div className="container">
        <div className={scss.hero}>
          <div className={scss.texts}>
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
            <button onClick={() => openModal()}>Начать</button>
          </div>
          <div className={scss.img}>
            <img src={data?.image} alt="img" />
          </div>
        </div>
        <div className={scss.cards}>
          <div className={scss.card}>
            <img src={heroCardIcon1} alt="img" />
            <h3>{dataHighlite[0]?.title}</h3>
            <div className={scss.line}></div>
            <p>{dataHighlite[0]?.description}</p>
          </div>
          <div className={scss.card}>
            <img src={heroCardIcon2} alt="img" />
            <h3>{dataHighlite[1]?.title}</h3>
            <div className={scss.line}></div>
            <p>{dataHighlite[1]?.description}</p>
          </div>
          <div className={scss.card}>
            <img src={heroCardIcon3} alt="img" />
            <h3>{dataHighlite[2]?.title}</h3>
            <div className={scss.line}></div>
            <p>{dataHighlite[2]?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
