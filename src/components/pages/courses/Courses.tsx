import type { FC } from "react";
import { useEffect, useState } from "react";
import scss from "./Courses.module.scss";
import img from "../../../assets/images/man.svg";
import Feedback from "../../ui/Feedback";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import CardCourse from "../../ui/CardCourse";

interface Course {
  id: number;
  price: number;
  title: string;
  description: string;
  course_img: string;
  duration: string;
  totalLessons: number;
  category: string;
}
interface Category {
  id: number;
  category_name: string;
}

interface FeedbackApiResponse {
  id: number;
  student: number;
  course: number;
  text: string;
  stars: number;
  created_date: string;
}

interface FeedbackType {
  id: number;
  avatar: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

const Courses: FC = () => {
  const API_KEY = "http://13.221.23.81/ru";

  const [activeCategory, setActiveCategory] = useState("Все курсы");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);

  const [popularCategory, setPopularCategory] = useState<Category[]>([
    { id: 0, category_name: "Все курсы" },
  ]);

  const [courses, setCourses] = useState<Course[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  console.log(courses);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = async () => {
    try {
      const response = await axios.get<Category[]>(`${API_KEY}/category/`);
      if (response.data && Array.isArray(response.data)) {
        setPopularCategory([
          { id: 0, category_name: "Все курсы" },
          ...response.data,
        ]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
      setError("Ошибка загрузки категорий");
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get<Course[]>(`${API_KEY}/course/`);
      if (response.data && Array.isArray(response.data)) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
      setError("Ошибка загрузки курсов");
    }
  };

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<FeedbackApiResponse[]>(
        `${API_KEY}/coursereview/`
      );

      if (response.data && Array.isArray(response.data)) {
        const transformedFeedbacks: FeedbackType[] = response.data.map(
          (item, ) => ({
            id: item.id,
            avatar: `https://i.pravatar.cc/100?img=${item.student}`,
            name: `Студент ${item.student}`,
            location: "Россия",
            text: item.text,
            rating: item.stars,
          })
        );

        setFeedbacks(transformedFeedbacks);

        if (transformedFeedbacks.length > 0 && selectedFeedback === null) {
          setSelectedFeedback(0);
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке отзывов:", error);
      setError("Ошибка загрузки отзывов");
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses =
    activeCategory === "Все курсы"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  useEffect(() => {
    fetchCategory();
    fetchCourse();
    fetchFeedback();
  }, []);

  const handlePrev = () => {
    if (feedbacks.length === 0) return;

    setSelectedFeedback((prev) =>
      prev === null
        ? feedbacks.length - 1
        : prev === 0
        ? feedbacks.length - 1
        : prev - 1
    );
  };

  const handleNext = () => {
    if (feedbacks.length === 0) return;

    setSelectedFeedback((prev) =>
      prev === null ? 0 : prev === feedbacks.length - 1 ? 0 : prev + 1
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (error) {
    return (
      <section className={scss.Courses}>
        <div className="container">
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Произошла ошибка: {error}</h2>
            <button
              onClick={() => {
                setError(null);
                fetchCategory();
                fetchCourse();
                fetchFeedback();
              }}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={scss.Courses}>
      <div className="container">
        <div className={scss.hero}>
          <div className={scss.heroText}>
            <h1>
              Развивайте свои навыки с <br /> помощью онлайн-курсов <br /> с
              онлайн-обучением
            </h1>
            <button className={scss.joinBtn}>Присоединиться</button>
          </div>
          <img src={img} alt="man" className={scss.heroImg} />
        </div>

        <div className={scss.popular}>
          <h1>Популярные курсы</h1>
          <p>
            Мы предоставляем множество функций, которые вы можете <br />{" "}
            использовать. Постепенное накопление информации
          </p>
          <div className={scss.popular_btns}>
            <div className={scss.filters}>
              {popularCategory.map((item) => (
                <button
                  key={item.id}
                  className={`${scss.categoryBtn} ${
                    activeCategory === item.category_name ? scss.active : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(item.category_name);
                    setVisibleCount(6);
                  }}
                >
                  {item.category_name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={scss.grid}>
          {filteredCourses.slice(0, visibleCount).map((course) => (
            <div
              key={course.id}
              className={`${scss.cardWrapper} ${
                selectedCard === course.id ? scss.cardActive : ""
              }`}
              onClick={() => setSelectedCard(course.id)}
            >
              <CardCourse
                {...course}
                onLearnMore={() => alert(`Подробнее о курсе: ${course.title}`)}
              />
            </div>
          ))}
        </div>

        {visibleCount < filteredCourses.length && (
          <div className={scss.loadMoreWrapper}>
            <button className={scss.loadMoreBtn} onClick={handleLoadMore}>
              Смотреть больше
            </button>
          </div>
        )}

        <div className={scss.Feed}>
          <h1>
            Нам доверяют тысячи <br /> довольных учеников
          </h1>
          <p>
            Мы предоставляем множество функций, которые вы можете <br />{" "}
            использовать. Постепенное накопление информации
          </p>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Загружаем отзывы...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Отзывы пока не загружены</p>
            </div>
          ) : (
            <>
              <div className={scss.feedbacksWrapper}>
                <div
                  className={scss.feedbacks}
                  style={{
                    transform: `translateX(-${(selectedFeedback ?? 0) * 100}%)`,
                  }}
                >
                  {feedbacks.map((item, index) => (
                    <Feedback
                      key={item.id}
                      avatar={item.avatar}
                      name={item.name}
                      location={item.location}
                      text={item.text}
                      rating={item.rating}
                      isActive={selectedFeedback === index}
                      onSelect={() => setSelectedFeedback(index)}
                    />
                  ))}
                </div>
              </div>

              <div className={scss.sliderNav}>
                <div className={scss.dots}>
                  {feedbacks.map((_, idx) => (
                    <span
                      key={idx}
                      className={idx === selectedFeedback ? scss.activeDot : ""}
                      onClick={() => setSelectedFeedback(idx)}
                    />
                  ))}
                </div>
                <div className={scss.sliderBtns}>
                  <button
                    onClick={handlePrev}
                    disabled={feedbacks.length === 0}
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={feedbacks.length === 0}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
