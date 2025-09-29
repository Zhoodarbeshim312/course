import type { FC } from "react";
import scss from "./CardAvailable.module.scss";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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

interface CardAvailableProps {
  el: IAvailable;
  ava1: string;
  icon1: string;
  icon2: string;
  icon3: string;
  favorite: IAvailable[];
  favBtn: (course: IAvailable) => void;
}

const CardAvailable: FC<CardAvailableProps> = ({
  el,
  ava1,
  icon1,
  icon2,
  icon3,
  favorite,
  favBtn,
}) => {
  const navigate = useNavigate();

  return (
    <div className={scss.card}>
      <a>{el.status_role}</a>
      <img src={el.course_img || ava1} alt={el.title || "course"} />
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
            <img src={icon1} alt="time" />
            <span>{el.time?.slice(0, 5) || "-"}</span>
          </div>

          <div className={scss.iconText}>
            <img src={icon2} alt="lessons" />
            <span>{el.count_lessons} уроков</span>
          </div>

          <div className={scss.iconText}>
            <img src={icon3} alt="progress" />
            <span>Прогресс</span>
          </div>
        </div>

        <button onClick={() => navigate(`/details/${el.id}`)}>
          Узнать больше <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardAvailable;
