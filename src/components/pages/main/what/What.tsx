import scss from "./What.module.scss";
import whatIcon1 from "../../../../assets/images/whatIcon1.svg";
import whatIcon2 from "../../../../assets/images/whatIcon2.svg";
import whatIcon3 from "../../../../assets/images/whatIcon3.svg";
import axios from "axios";
import { API_KEY } from "../../../../API";
import { useEffect, useState } from "react";
interface IWhoCourse {
  id: number;
  title: string;
  description: string;
  title_number_one: string;
  number_one_description: string;
  title_number_two: string;
  number_two_description: string;
}
interface IWhoHighle {
  id: number;
  who_course: number;
  iconka: string;
  title: string;
  description: string;
}
const What = () => {
  const [data, setData] = useState<IWhoCourse | null>(null);
  const [dataWho, setDataWho] = useState<IWhoHighle[]>([]);
  const getwhoCourse = async () => {
    let res = await axios.get<IWhoCourse[]>(`${API_KEY}/who_course/`);
    setData(res.data[0]);
    console.log(res.data[0]);
  };
  const getWhoCourseHighle = async () => {
    let res = await axios.get<IWhoHighle[]>(`${API_KEY}/who_coursehighlight/`);
    setDataWho(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getwhoCourse();
    getWhoCourseHighle();
  }, []);
  return (
    <section className={scss.What}>
      <div className="container">
        <div className={scss.what}>
          <div className={scss.titles}>
            <h1>{data?.title}</h1>
            <p>
              {data?.description.slice(0, 53)} <br />
              {data?.description.slice(53)}
            </p>
          </div>
          <div className={scss.actions}>
            <h1>{data?.title_number_one}</h1>
            <p>
              {data?.description.slice(0, 53)} <br />
              {data?.description.slice(53)}
            </p>
            <h1>{data?.title_number_two}</h1>
            <p>
              {data?.description.slice(0, 53)} <br />
              {data?.description.slice(53)}
            </p>
          </div>
          <div className={scss.info}>
            <div className={scss.icons}>
              <img src={whatIcon1} alt="img" />
              <div className={scss.text}>
                <h3>{dataWho[0]?.title}</h3>
                <p>
                  {dataWho[0]?.description.slice(0, 37)} <br />
                  {dataWho[0]?.description.slice(37)}
                </p>
              </div>
            </div>
            <div className={scss.icons}>
              <img src={whatIcon2} alt="img" />
              <div className={scss.text}>
                <h3>{dataWho[1]?.title}</h3>
                <p>
                  {dataWho[1]?.description.slice(0, 37)} <br />
                  {dataWho[1]?.description.slice(37)}
                </p>
              </div>
            </div>
            <div className={scss.icons}>
              <img src={whatIcon3} alt="img" />
              <div className={scss.text}>
                <h3>{dataWho[2]?.title}</h3>
                <p>
                  {dataWho[2]?.description.slice(0, 37)} <br />
                  {dataWho[2]?.description.slice(37)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default What;
