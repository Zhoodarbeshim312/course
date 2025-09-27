import { useEffect, useState, type FC } from "react";
import scss from "./Founder.module.scss";
import axios from "axios";

interface IABOUTUS {
  id: number;
  title: string;
  authorBio: string | null; // иногда может быть null
  authorImage: string;
  titleAuthor: string;
}

const Founder: FC = () => {
  const [author, setAuthor] = useState<IABOUTUS[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthor = async () => {
    try {
      const { data } = await axios.get<IABOUTUS[]>(
        "http://13.221.23.81/ru/about_us/"
      );
      if (Array.isArray(data)) {
        setAuthor(data);
      } else {
        console.warn("Ответ не массив:", data);
      }
    } catch (e) {
      console.error("Ошибка при загрузке:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <section className={scss.Founder}>
      <div className="container">
        {loading ? (
          <p>Загрузка...</p>
        ) : author.length > 0 ? (
          author.map((item) => (
            <div key={item.id} className={scss.founder}>
              <h1>{item.titleAuthor}</h1>
              <div className={scss.img}>
                <img src={item.authorImage} alt={item.titleAuthor} />
                <p>{item.authorBio ? item.authorBio.slice(0, 200) : "loading"}</p>
              </div>
              <p>{item.authorBio ? item.authorBio.slice(200) : "loading"}</p>
            </div>
          ))
        ) : (
          <p>Данные об авторе не найдены</p>
        )}
      </div>
    </section>
  );
};

export default Founder;
