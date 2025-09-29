import scss from "./Available.module.scss";
import ava1 from "../../../../assets/images/available.svg";
import icon1 from "../../../../assets/images/avaIcon1.svg";
import icon2 from "../../../../assets/images/avaIcon2.svg";
import icon3 from "../../../../assets/images/avaIcon3.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { API_KEY } from "../../../../API";
import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import FollowFrom from "../../../ui/FollowFrom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/readuxUse";
import { addToFavorite } from "../../../../toolkit/FavoriteSlice";
interface IAvailable {
  id: number;
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
  const { favorite } = useAppSelector((s) => s.favorite);
  const dispatch = useAppDispatch();
  const getAvailable = async (): Promise<void> => {
    let res = await axios.get<IAvailable[]>(`${API_KEY}/course/`);
    setData(res.data);
  };
  const favBtn = (course: IAvailable) => {
    dispatch(addToFavorite(course));
  };

  useEffect(() => {
    getAvailable();
  }, []);
  console.log(data);

  return (
    <>
      <section className={scss.Available}>
        <div className="container">
          <div className={scss.available}>
            <h1>Доступные курсы</h1>
            <p>
              Мы предоставляем множество функций, которые вы можете <br />
              использовать. Постепенное накопление информация
            </p>
            <div className={scss.box}>
              {data.map((el) => (
                <div key={el.id} className={scss.card}>
                  <a>{el.status_role}</a>
                  <img src={el.course_img || ava1} alt="img" />
                  <h5 onClick={() => favBtn(el)}>
                    {favorite.some((f) => f.id === el.id) ? (
                      <IoMdHeart color="red" size={24} />
                    ) : (
                      <IoMdHeartEmpty size={24} />
                    )}
                  </h5>
                  <div className={scss.text}>
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                    <div className={scss.icons}>
                      <div className={scss.iconText}>
                        <img src={icon1} alt="img" />
                        <span>{el.time.slice(0, 5)}</span>
                      </div>
                      <div className={scss.iconText}>
                        <img src={icon2} alt="img" />
                        <span>{el.count_lessons} уроков</span>
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
              ))}
            </div>
            <FollowFrom />
          </div>
        </div>
      </section>
    </>
  );
};

export default Available;
