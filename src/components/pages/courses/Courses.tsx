import type { FC } from "react";
import { useState } from "react";
import scss from "./Courses.module.scss";
// import img from "../../../assets/img/man.svg";
import img from '..//..//..//assets/images/man.svg'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardCourse from "../../ui/CardCourse";
import Feedback from "../../ui/Feedback";

const Courses: FC = () => {
  const [activeCategory, setActiveCategory] = useState("Все курсы");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);

  const popularCategory = [
    "Все курсы",
    "Управление",
    "Маркетинг",
    "Программирование",
    "Дизайн",
  ];

  const courses = [
    {
      id: 1,
      price: "1500 сом",
      title: "Как ставить и оценивать задачи",
      description: "Мы ориентируемся на эргономику и то, где работать...",
      image: "https://picsum.photos/400/240?random=1",
      duration: "22ч 30мин",
      totalLessons: 64,
      category: "Управление",
    },
    {
      id: 2,
      price: "1500 сом",
      title: "Управление командой",
      description: "Изучите основы лидерства и управление людьми...",
      image: "https://picsum.photos/400/240?random=2",
      duration: "18ч 10мин",
      totalLessons: 52,
      category: "Управление",
    },
    {
      id: 3,
      price: "1500 сом",
      title: "Маркетинг для начинающих",
      description: "Познакомьтесь с базовыми принципами продвижения...",
      image: "https://picsum.photos/400/240?random=3",
      duration: "20ч",
      totalLessons: 48,
      category: "Маркетинг",
    },
    {
      id: 4,
      price: "1500 сом",
      title: "Продажи в цифровую эпоху",
      description: "Эффективные техники продаж и работы с клиентами...",
      image: "https://picsum.photos/400/240?random=4",
      duration: "25ч",
      totalLessons: 70,
      category: "Маркетинг",
    },
    {
      id: 5,
      price: "1500 сом",
      title: "Основы веб-дизайна",
      description: "Изучите типографику, цвет и компоновку сайтов...",
      image: "https://picsum.photos/400/240?random=5",
      duration: "30ч",
      totalLessons: 80,
      category: "Дизайн",
    },
    {
      id: 6,
      price: "1500 сом",
      title: "Финансовая грамотность",
      description: "Научитесь управлять личными финансами и бюджетом...",
      image: "https://picsum.photos/400/240?random=6",
      duration: "15ч",
      totalLessons: 40,
      category: "Управление",
    },
    {
      id: 7,
      price: "1500 сом",
      title: "Основы программирования",
      description: "Первые шаги в JavaScript, Python и алгоритмах...",
      image: "https://picsum.photos/400/240?random=7",
      duration: "28ч",
      totalLessons: 90,
      category: "Программирование",
    },
    {
      id: 8,
      price: "1500 сом",
      title: "Data Science для начинающих",
      description: "Изучите Python, Pandas и анализ данных...",
      image: "https://picsum.photos/400/240?random=8",
      duration: "35ч",
      totalLessons: 100,
      category: "Программирование",
    },
  ];

  const feedbacks = [
    {
      avatar: "https://picsum.photos/100?random=11",
      name: "Viez Robert",
      location: "Warsaw, Poland",
      text: "«Вау... Я очень рад использовать этот VPN, он оказался больше, чем мои ожидания...»",
      rating: 4.5,
    },
    {
      avatar: "https://picsum.photos/100?random=12",
      name: "Yessica Christy",
      location: "Shanxi, China",
      text: "«Мне это нравится, потому что я люблю путешествовать далеко и все еще могу подключаться...»",
      rating: 4.5,
    },
    {
      avatar: "https://picsum.photos/100?random=13",
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      text: "«Это очень необычно для моего бизнеса, которому требуется VPN с высоким уровнем безопасности»",
      rating: 4.5,
    },
  ];

  const filteredCourses =
    activeCategory === "Все курсы"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));

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
              {popularCategory.map((item, idx) => (
                <button
                  key={idx}
                  className={`${scss.categoryBtn} ${
                    activeCategory === item ? scss.active : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(item);
                    setVisibleCount(6);
                  }}
                >
                  {item}
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
          <div className={scss.feedbacksWrapper}>
            <div
              className={scss.feedbacks}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {feedbacks.map((item, index) => (
                <Feedback
                  key={index}
                  {...item}
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
                  className={idx === activeIndex ? scss.activeDot : ""}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
            <div className={scss.sliderBtns}>
              <button onClick={handlePrev}>
                <FaArrowLeft />
              </button>
              <button onClick={handleNext}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
