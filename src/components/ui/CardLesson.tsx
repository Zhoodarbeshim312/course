import type { FC } from "react";
import scss from "./CardLesson.module.scss";
import { FaLock } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";

interface ICart {
  id: number;
  owner: string;
  time: string;
  lesson: string;
  course: string;
  course_video: string;
  title: string;
  created_date: string;
}

const CardLesson: FC<ICart> = ({
  id,
  course_video,
  time,
  title,
  lesson,
  course,
}) => {
  return (
    <section className={scss.CardLesson}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.img_fone}
            style={{ backgroundImage: `url(${course_video})` }}
          >
            {id === 0 ? <IoIosPlayCircle /> : <FaLock />}
            <p>{time}</p>
          </div>
          <div className={scss.content_bottom}>
            <h6>
              {lesson}
              {course}
            </h6>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardLesson;
