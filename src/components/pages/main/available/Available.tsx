import scss from "./Available.module.scss";
const Available = () => {
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
              <a></a>
              <img src="" alt="" />
              <h3></h3>
              <p></p>
              <div className={scss.icons}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Available;
