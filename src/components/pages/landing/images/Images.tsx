import { useEffect, useState, type FC } from "react";
import scss from "./Images.module.scss";
import axios from "axios";

interface AboutUsImage {
  id: number;
  about_us: number;
  image: string;
}

const Images: FC = () => {
  const [images, setImages] = useState<AboutUsImage[]>([]);
  const fetchData = async (): Promise<AboutUsImage[] | void> => {
    try {
      const data = await axios.get<AboutUsImage[]>(
        "http://13.221.23.81/ru/aboutus_images/"
      );
      setImages(data.data);
      return data.data;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={scss.Images}>
      <div className="container">
        <div className={scss.images}>
          <img src={images[1]?.image} alt="img" />
          <img className={scss.img1} src={images[1]?.image} alt="img" />
          <img src={images[2]?.image} alt="img" />
          <img className={scss.img2} src={images[3]?.image} alt="img" />
        </div>
      </div>
    </section>
  );
};

export default Images;
