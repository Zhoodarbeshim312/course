import { useEffect, useState, type FC } from "react";
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
  const [data, setData] = useState<IData>([
    {
      id: 1,
      lesson_course: 1,
      title_fot_theme: "Маркетинг",
      description_for_theme:
        "Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации",
      image_theme:
        "http://13.221.23.81/media/theme_images/product-cover-75_1.png",
      title_one: "Как ставить о оценивать задачи",
      description_one:
        "Прежде чем разбирать бизнес-кейсы, стоит поговорить об основах финансовой грамотности. На вопрос, как сохранить деньги, Маргулан Калиевич предлагает несколько стратегий:",
      title_two: "Фиксированный налог",
      description_two:
        "на будущее и безопасность. С каждого своего дохода откладывайте по 10% на будущее и на безопасность. Прелесть этой стратегии в том, что она подходит как длялюдей с доходом 500$, так и для людей с доходом 500 000$.",
      title_three: "Прогрессивный налог",
      description_three:
        "на будущее. Суть метода в том, что вы откладываете не 10%, а столько, сколько вам лет. Например, если вам 30, то и налог — 30%. Это могут позволить уже не все, зато для обладателей больших доходов такой подход более уместен, ведь он лучше страхует от рисков, связанных с предпринимательской деятельностью.",
      title_four: "Регрессивный налог",
      description_four:
        "на будущее. В данном случае вы откладываете не такой процент, сколько вам лет, а процент, равный вычитанию возраста из 100. То есть если вам 30, то откладывайте 70% дохода. Очевидно, этот способ подойдёт только для тех, лишь малая доля дохода которых уже обеспечивает комфорт. Зато это неплохой задел на раннюю пенсию и безбедное детство детей. Хранить эти деньги стоит диверсифицированно. 10% сбережений оставляйте в национальной валюте вашей страны. 90 % распределите на 3 валюты: швейцарский франк, норвежская крона, и что-то из: американского доллара, евро либо йены. Рассмотрите варианты сбережений вгосударственных бумагах, фиксированных к инфляции.Эти рекомендации касаются личного бюджета. Ниже мы рассмотрим основные финансовые рискив бизнесе и стратегии управления ими",
    },
  ]);
  const [video, setVideo] = useState<IVideoData>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://13.221.23.81/ru/lesson/");
      setData(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
  const FetchVideo = async () => {
    try {
      const data = await axios.get("http://13.221.23.81/ru/vidio/");
      setVideo(data.data);
      return data.data;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
    FetchVideo();
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={scss.DetailsPage}>
      <div className="container">
        {data.map((item, idx) => (
          <div key={idx} className={scss.hero}>
            <div className={scss.content}>
              <div className={scss.content_top}>
                <h1>{item.title_fot_theme}</h1>
                <p>{item.description_for_theme}</p>
              </div>
              <div className={scss.content_middle}>
                <div className={scss.image_container}>
                  <img src={item.image_theme} alt="img" />
                </div>
                <div className={scss.middle_text}>
                  <h2>{item.title_one}</h2>
                  <p>{item.description_one}</p>
                  <p>
                    <h2>{item.title_two}</h2>
                    {item.description_two}
                  </p>
                  <p>
                    <h2>{item.title_three}</h2>
                    {item.description_three}
                  </p>
                  <p>
                    <h2>{item.title_four}</h2>
                    {item.description_four?.slice(0, 345)}
                  </p>
                </div>
              </div>
              <p>{item.description_four?.slice(345)}</p>
            </div>
            <div className={scss.lessons}>
              <div className={scss.box_lesson}>
                {video.map((lesson, index) => (
                  <div key={index} className={scss.box}>
                    <div
                      className={scss.box_top}
                      onClick={() => handleToggle(index)}
                    >
                      <h4>
                        {lesson.course}
                        {lesson.lesson}
                      </h4>
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
                        {video.map((card, cardIdx) => (
                          <CardLesson key={cardIdx} {...card} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailsPage;
