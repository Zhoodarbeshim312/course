import React from "react";
import styles from "./Feedback.module.scss";

interface FeedbackProps {
  avatar: string;
  name: string;
  location: string; // город и страна
  text: string;
  rating: number;
  isActive?: boolean;
  onSelect?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({
  avatar,
  name,
  location,
  text,
  rating,
  isActive = false,
  onSelect,
}) => {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={avatar} alt={name} className={styles.avatar} />
          <div>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.location}>{location}</p>
          </div>
        </div>
        <div className={styles.rating}>
          <span>{rating.toFixed(1)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="orange"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.739 1.54 8.294L12 18.896l-7.476 4.446 1.54-8.294L0 9.309l8.332-1.151z" />
          </svg>
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Feedback;
