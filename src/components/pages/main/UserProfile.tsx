import React, { use, useEffect, useState } from "react";
import styles from "./UserProfile.module.scss";
import axios from "axios";
import CardCourse from "../../ui/CardCourse";
import fone from "..//..//..//assets/images/foneuser.png";
interface Course {
  id: number;
  title: string;
  description: string;
  course_img: string;
  price: number;
  time: string;
  count_lessons: number;
  category: number;
  owner: number;
  status_role: string;
}

const UserProfile: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState("Саша Петрова");

  const fetchCourse = async () => {
    try {
      const response = await axios.get<Course[]>(
        `http://13.221.23.81/ru/course/`
      );
      if (response.data && Array.isArray(response.data)) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className={styles.profileContainer}>
      {courses.length > 0 && (
        <div className={styles.header}>
          <img
            src={courses[0].course_img}
            alt={courses[0].title}
            className={styles.avatar}
          />
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.name}>{user}</h1>
              <p className={styles.status}>
                {user === "Arlen" ||
                user === "Joodar" ||
                user === "Telegey" ||
                user === "Bilal"
                  ? "Преподаватель"
                  : "Студент"}
              </p>
            </div>
            <button className={styles.editButton}>Редактировать</button>
          </div>
        </div>
      )}

      <div className={styles.navigation}>
        <button className={styles.navButton}>Мои курсы</button>
        <button className={styles.navButton}>Избранное</button>
      </div>

      <div className={styles.cardsGrid}>
        {courses.map((card) => (
          <>
            {" "}
            <CardCourse
              key={card.id}
              price={card.price}
              title={card.title}
              description={card.description}
              course_img={card.course_img}
              duration={card.time}
              totalLessons={card.count_lessons}
              onLearnMore={() => console.log("Подробнее о курсе:", card.id)}
            />{" "}
            <CardCourse
              key={card.id}
              price={card.price}
              title={card.title}
              description={card.description}
              course_img={card.course_img}
              duration={card.time}
              totalLessons={card.count_lessons}
              onLearnMore={() => console.log("Подробнее о курсе:", card.id)}
            />{" "}
            <CardCourse
              key={card.id}
              price={card.price}
              title={card.title}
              description={card.description}
              course_img={card.course_img}
              duration={card.time}
              totalLessons={card.count_lessons}
              onLearnMore={() => console.log("Подробнее о курсе:", card.id)}
            />
            <CardCourse
              key={card.id}
              price={card.price}
              title={card.title}
              description={card.description}
              course_img={card.course_img}
              duration={card.time}
              totalLessons={card.count_lessons}
              onLearnMore={() => console.log("Подробнее о курсе:", card.id)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
