import Player from "../components/Player";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";

const Index = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [videoJsOptions, setVideoJsOptions] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://mahad-al-tafsir.herokuapp.com/getYT?id=9Vj8tSVrabk`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data[0].url) {
          console.log(data.data[0].url);
          setVideoJsOptions({
            techOrder: ["html5"],
            autoplay: false,
            controls: true,
            preload: "metada",
            poster: "/loader_light.png",
            fluid: true,
            responsive: true,
            sources: [
              {
                src: data.data[0].url,
                type: "video/mp4",
              },
            ],
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading video...</div>;

  return (
    <div className={styles.video}>
      {"sources" in videoJsOptions && <Player {...videoJsOptions} />}
    </div>
  );
};

export default Index;
