import scss from "./Available.module.scss";
import ava1 from "../../../../assets/images/available.svg";
import ava2 from "../../../../assets/images/available2.svg";
import ava3 from "../../../../assets/images/available3.svg";
import icon1 from "../../../../assets/images/avaIcon1.svg";
import icon2 from "../../../../assets/images/avaIcon2.svg";
import icon3 from "../../../../assets/images/avaIcon3.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { API_KEY } from "../../../../API";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import FollowFrom from "../../../ui/FollowFrom";
interface IAvailable {
  owner: number;
  category: number;
  title: string;
  description: string;
  course_img: string;
  status_role: string;
  time: string;
  count_lessons: number;
  price: number;
}
const Available = () => {
  const [data, setData] = useState<IAvailable[]>([]);
  const getAvailable = async (): Promise<void> => {
    let res = await axios.get<IAvailable[]>(`${API_KEY}/course/`);
    setData(res.data);
  };
  useEffect(() => {
    getAvailable();
  }, []);
  console.log(data);

  return (
    <section className={scss.Available}>
      <div className="container">
        <div className={scss.available}>
          <h1>Доступные курсы</h1>
          <p>
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информация
          </p>
          <div className={scss.box}>
            <div className={scss.card}>
              <a>{data.map((el) => el.status_role)}</a>
              <img src={ava1} alt="img" />
              <h5>
                <IoMdHeartEmpty />
              </h5>
              <div className={scss.text}>
                <h3>{data.map((el) => el.title)}</h3>
                <p>{data.map((el) => el.description)}</p>
                <div className={scss.icons}>
                  <div className={scss.iconText}>
                    <img src={icon1} alt="img" />
                    <span>{data.map((el) => el.time.slice(0, 5))}</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon2} alt="img" />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon3} alt="img" />
                    <span>Прогресс</span>
                  </div>
                </div>
                <button>
                  Узнать больше <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
            <div className={scss.card}>
              <a>{data.map((el) => el.status_role)}</a>
              <img src={ava2} alt="img" />
              <h5>
                <IoMdHeartEmpty />
              </h5>
              <div className={scss.text}>
                <h3>{data.map((el) => el.title)}</h3>
                <p>{data.map((el) => el.description)}</p>
                <div className={scss.icons}>
                  <div className={scss.iconText}>
                    <img src={icon1} alt="img" />
                    <span>{data.map((el) => el.time.slice(0, 5))}</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon2} alt="img" />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon3} alt="img" />

                    <span>Прогресс</span>
                  </div>
                </div>
                <button>
                  Узнать больше <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
            <div className={scss.card}>
              <a>{data.map((el) => el.status_role)}</a>
              <img src={ava3} alt="img" />
              <h5>
                <IoMdHeartEmpty />
              </h5>
              <div className={scss.text}>
                <h3>{data.map((el) => el.title)}</h3>
                <p>{data.map((el) => el.description)}</p>
                <div className={scss.icons}>
                  <div className={scss.iconText}>
                    <img src={icon1} alt="img" />
                    <span>{data.map((el) => el.time.slice(0, 5))}</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon2} alt="img" />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon3} alt="img" />
                    <span>Прогресс</span>
                  </div>
                </div>
                <button>
                  Узнать больше <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
          <FollowFrom />
        </div>
      </div>
    </section>
  );
};

export default Available;
