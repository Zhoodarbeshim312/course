import scss from "./Available.module.scss";
import ava from "../../../../assets/images/available.svg";
import icon1 from "../../../../assets/images/avaIcon1.svg";
import icon2 from "../../../../assets/images/avaIcon2.svg";
import icon3 from "../../../../assets/images/avaIcon3.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
const Available = () => {
  const getAvailable = async ():Promise<void> => {
let res = await axios(``)
  }
  return (
    <section className={scss.Available}>
      <div className="container">
        <div className={scss.available}>
          <h1>Доступные курсы</h1>
          <p>
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информация
          </p>
          <div className={scss.box}>
            <div className={scss.card}>
              <a>Бесплатно</a>
              <img src={ava} alt="img" />
              <div className={scss.text}>
                <h3>
                  Как ставить о оценивать <br /> задачи
                </h3>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>
                <div className={scss.icons}>
                  <div className={scss.iconText}>
                    <img src={icon1} alt="img" />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon2} alt="img" />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.iconText}>
                    <img src={icon3} alt="img" />
                    <span>Прогресс</span>
                  </div>
                </div>
                <button>
                  Узнать больше <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Available;
