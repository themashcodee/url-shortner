import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import { TokenContext } from "./_app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { LinksType } from "../Types/index";

interface refreshToken {
  message: string;
  status: number;
  data: {
    accessToken: string;
  };
}

const Home = () => {
  const router = useRouter();
  const { token } = useContext(TokenContext);
  const [accessToken, setAccessToken] = useState<string>(token);
  const [links, setLinks] = useState<[LinksType]>();

  const logout = async () => {
    const res = await (
      await fetch("https://shortie-api.herokuapp.com/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      })
    ).json();
    if (res.status === 200) {
      router.push("/signin");
    }
  };

  // PREVENTING TO LOGIN AGAIN AFTER EXPIRING TOKEN
  useEffect(() => {
    setInterval(async () => {
      const data: refreshToken | null = await (
        await fetch(
          "https://shortie-api.herokuapp.com/api/v1/auth/refreshtoken",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        )
      ).json();
      if (data?.status === 200) {
        setAccessToken(data.data.accessToken);
      }
    }, 1000 * 60 * 14);
  }, []);

  // WHEN WE REFRESH THE WEBSITE OR COME LATER SO REFRESHING THE ACCESS TOKEN AND SETTING IT IN THE STATE
  useEffect(() => {
    const fetchToken = async () => {
      if (!accessToken) {
        const data: refreshToken | null = await (
          await fetch(
            "https://shortie-api.herokuapp.com/api/v1/auth/refreshtoken",
            {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
              },
            }
          )
        ).json();
        if (data?.status === 200) {
          setAccessToken(data.data.accessToken);
        } else {
          router.replace("/signin");
        }
      }
    };
    fetchToken();
  }, [accessToken, router]);

  // GETTING THE USER DETAILS WITH THE HELP OF ACCESSTOKEN
  useEffect(() => {
    const userDetails = async () => {
      if (accessToken) {
        const res = await (
          await fetch(
            "https://shortie-api.herokuapp.com/api/v1/link/userdetails",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                authorization: `Bearer ${accessToken}`,
              },
              credentials: "include",
            }
          )
        ).json();
        if (res.status === 200) {
          setLinks(res.data.user.links);
        }
      }
    };
    userDetails();
  }, [accessToken]);

  return (
    <div className={styles.page}>
      <Head>
        <title>Url Shortner</title>
        <meta
          name="description"
          content="make your urls short and easy to maintain"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header accessToken={accessToken} setLinks={setLinks}></Header>
      <h2 className={styles.subTitle}>Your Links</h2>
      <div className={styles.cardsContainer}>
        <Cards setLinks={setLinks} links={links} accessToken={accessToken} />
      </div>
      <div onClick={logout} className={styles.logout}>
        Log out
      </div>
    </div>
  );
};
export default Home;
