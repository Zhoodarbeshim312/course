import scss from "./Available.module.scss";
import ava1 from "../../../../assets/images/available.svg";
import icon1 from "../../../../assets/images/avaIcon1.svg";
import icon2 from "../../../../assets/images/avaIcon2.svg";
import icon3 from "../../../../assets/images/avaIcon3.svg";
import axios from "axios";
import { API_KEY } from "../../../../API";
import { useEffect, useState } from "react";
import FollowFrom from "../../../ui/FollowFrom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/readuxUse";
import { addToFavorite } from "../../../../toolkit/FavoriteSlice";
import CardAvailable from "../../../ui/CardAvailable";

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
    const res = await axios.get<IAvailable[]>(`${API_KEY}/course/`);
    setData(res.data);
  };

  const favBtn = (course: IAvailable) => {
    dispatch(addToFavorite(course));
  };

  useEffect(() => {
    getAvailable();
  }, []);

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
            {data.map((el) => (
              <CardAvailable
                key={el.id}
                el={el}
                ava1={ava1}
                icon1={icon1}
                icon2={icon2}
                icon3={icon3}
                favorite={favorite}
                favBtn={favBtn}
              />
            ))}
          </div>

          <FollowFrom />
        </div>
      </div>
    </section>
  );
};

export default Available;
