import React from "react";
import styles from "./Feedback.module.scss";

interface FeedbackProps {
  avatar?: string;
  name: string;
  location?: string;
  text?: string;
  rating?: number;
  isActive?: boolean;
  onSelect?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({
  avatar,
  name,
  location = "",
  text = "",
  rating = 0,
  isActive = false,
  onSelect,
}) => {
  const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive ? true : undefined}
    >
      <div className={styles.header}>
        <div className={styles.userInfo}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className={styles.avatar}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className={styles.avatar} aria-hidden>
              {name ? name.charAt(0).toUpperCase() : ""}
            </div>
          )}

          <div>
            <h4 className={styles.name}>{name}</h4>
            {location && <p className={styles.location}>{location}</p>}
          </div>
        </div>

        <div className={styles.rating}>
          <span>{safeRating.toFixed(1)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="orange"
            viewBox="0 0 24 24"
            aria-hidden
            focusable="false"
          >
            <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.739 1.54 8.294L12 18.896l-7.476 4.446 1.54-8.294L0 9.309l8.332-1.151z" />
          </svg>
        </div>
      </div>

      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Feedback;
