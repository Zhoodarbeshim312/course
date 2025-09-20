import React from "react";
import styles from "./CardCourse.module.scss";
import wave from "..//..//assets/images/wave.svg";
import vector from "..//..//assets/images/vector.svg";
import alarm from "..//..//assets/images/alarm.svg";

interface CardCourseProps {
  price: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  totalLessons: number;
  onLearnMore?: () => void;
}

const CardCourse: React.FC<CardCourseProps> = ({
  price,
  title,
  description,
  image,
  duration,
  totalLessons,
  onLearnMore,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.price}>{price}</div>
        <button className={styles.favoriteBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <img src={alarm} alt="time" width="16" height="16" />
            <span>{duration}</span>
          </div>

          <div className={styles.stat}>
            <img src={wave} alt="lessons" width="16" height="16" />
            <span>{totalLessons} уроков</span>
          </div>

          <div className={styles.stat}>
            <img src={vector} alt="progress" width="16" height="16" />
            <span>Прогресс</span>
          </div>
        </div>

        <button className={styles.learnMoreBtn} onClick={onLearnMore}>
          Узнать больше
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardCourse;
