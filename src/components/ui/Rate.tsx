import type { FC } from "react";
import scss from "./Rate.module.scss";
import Radio from "./Radio";

const Rate: FC = () => {
  return (
    <section className={scss.Rate}>
      <div className="container">
        <div className={scss.content}>
          <h1>Как вам наш курс?</h1>
          <Radio />
          <input type="text" placeholder="Комментарий..." />
          <button>Отправить</button>
        </div>
      </div>
    </section>
  );
};

export default Rate;
