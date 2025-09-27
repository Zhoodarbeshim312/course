import type { FC } from "react";
import scss from "./CardLesson.module.scss";
import { FaLock } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";

interface ICart {
  id: number;
  image: string;
  time: string; 
  title: string;
  description: string;
}

const CardLesson: FC<ICart> = ({ id, image, time, title, description }) => {
  return (
    <section className={scss.CardLesson}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.img_fone}
            style={{ backgroundImage: `url(${image})` }}
          >
            {id === 0 ? <IoIosPlayCircle /> : <FaLock />}
            <p>{time}</p>
          </div>
          <div className={scss.content_bottom}>
            <h6>{title}</h6>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardLesson;
