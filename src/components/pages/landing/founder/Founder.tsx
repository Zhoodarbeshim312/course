import { useEffect, useState, type FC } from "react";
import scss from "./Founder.module.scss";
import axios from "axios";

interface IABOUTUS {
  id: number;
  title: string;
  authorBio: string | null;
  authorImage: string;
  titleAuthor: string;
}

const Founder: FC = () => {
  const [author, setAuthor] = useState<IABOUTUS[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthor = async () => {
    try {
      const { data } = await axios.get("http://13.221.23.81/ru/about_us/");

      if (Array.isArray(data)) {
        const normalized: IABOUTUS[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          authorBio: item.author_bio,
          authorImage: item.author_image,
          titleAuthor: item.title_author,
        }));
        setAuthor(normalized);
      } else {
        console.warn("Ответ не массив:", data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  // useEffect(() => {
  //   console.log("AUTHOR DATA (normalized):", author);
  // }, [author]);

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
                <p>{item.authorBio?.slice(0, 620) ?? "Нет биографии"}</p>
              </div>
              <p>{item.authorBio?.slice(620) ?? ""}</p>
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
