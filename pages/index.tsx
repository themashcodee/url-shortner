import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/index.module.scss";

const Home: NextPage = () => {
  const getAllLink = async () => {
    const result = await fetch("https://localhost:4000/api/v1/link/getall");
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shortner</title>
        <meta
          name="description"
          content="make your urls short and easy to maintain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello World</h1>
      <button onClick={() => getAllLink()}>request</button>
    </div>
  );
};

export default Home;
