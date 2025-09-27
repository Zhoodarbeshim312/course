import type { FC } from "react";
import scss from "./FollowFrom.module.scss";

const FollowFrom: FC = () => {
  return (
    <div className={scss.following}>
      <h1>Присоединяйся к нам</h1>
      <p>
        Мы предоставляем множество функций, которые вы можете <br />{" "}
        использовать. Постепенное накопление информация{" "}
      </p>
      <div className={scss.followForm}>
        <input type="text" placeholder="Твой Email" />
        <button>Подписка</button>
      </div>
    </div>
  );
};

export default FollowFrom;
