import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import scss from "./DetailsPage.module.scss";
import axios from "axios";
import { IoIosArrowDropdown } from "react-icons/io";
import CardLesson from "../../ui/CardLesson";

interface IObj {
  id: number;
  lesson_course?: number;
  title_fot_theme?: string;
  description_for_theme?: string;
  image_theme?: string;
  title_one?: string;
  description_one?: string;
  title_two?: string;
  description_two?: string;
  title_three?: string;
  description_three?: string;
  title_four?: string;
  description_four?: string;
}
type IData = IObj[];

interface IVideo {
  id: number;
  owner: string;
  time: string;
  lesson: string;
  course: string;
  course_video: string;
  title: string;
  created_date: string;
}
type IVideoData = IVideo[];

const DetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IData>([]);
  const [video, setVideo] = useState<IVideoData>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://13.221.23.81/ru/lesson/");
        setData(res.data);
      } catch (e) {
        console.error("Ошибка загрузки темы:", e);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const currentTheme = data.find((item) => item.id === Number(id));
  if (!currentTheme) return <h2>Тема не найдена</h2>;

  const courseLessons = video.filter(
    (lesson) => Number(lesson.course) === Number(id)
  );

  return (
    <section className={scss.DetailsPage}>
      <div className="container">
        <div className={scss.hero}>
          <div className={scss.content}>
            <div className={scss.content_top}>
              <h1>{currentTheme.title_fot_theme}</h1>
              <p>{currentTheme.description_for_theme}</p>
            </div>

            <div className={scss.content_middle}>
              <div className={scss.image_container}>
                <img src={currentTheme.image_theme} alt="img" />
              </div>
              <div className={scss.middle_text}>
                <h2>{currentTheme.title_one}</h2>
                <p>{currentTheme.description_one}</p>

                <h2>{currentTheme.title_two}</h2>
                <p>{currentTheme.description_two}</p>

                <h2>{currentTheme.title_three}</h2>
                <p>{currentTheme.description_three}</p>

                <h2>{currentTheme.title_four}</h2>
                <p>{currentTheme.description_four}</p>
              </div>
            </div>
          </div>

          <div className={scss.lessons}>
            <div className={scss.box_lesson}>
              {courseLessons.map((lesson, index) => (
                <div key={lesson.id} className={scss.box}>
                  <div
                    className={scss.box_top}
                    onClick={() => handleToggle(index)}
                  >
                    <h4>{lesson.title}</h4>
                    <IoIosArrowDropdown
                      className={`${scss.arrow} ${
                        activeIndex === index ? scss.open : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`${scss.box_in} ${
                      activeIndex === index ? scss.visible : ""
                    }`}
                  >
                    <div className={scss.cards}>
                      <CardLesson {...lesson} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
