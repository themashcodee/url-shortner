import React, { FC } from "react";
import styles from "../styles/index.module.css";
import Link from "next/link";
import { LinksType } from "../Types/index";
import { updateState } from "../Helper";

interface Props {
  accessToken: string;
  visits: number;
  short: string;
  original: string;
  setLinks: React.Dispatch<React.SetStateAction<[LinksType] | undefined>>;
}

const UrlCard: FC<Props> = ({
  setLinks,
  accessToken,
  visits,
  short,
  original,
}) => {
  const updateUrl = async () => {
    const newUrl = prompt("New Url");
    if (!newUrl) return alert("Kindly provide a url");
    const res = await (
      await fetch("https://shortie-api.herokuapp.com/api/v1/link/updateone", {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl: short, longUrl: newUrl }),
      })
    ).json();
    console.log(res);
    await updateState(setLinks, accessToken);
  };

  const deleteUrl = async () => {
    const res = await (
      await fetch("https://shortie-api.herokuapp.com/api/v1/link/deleteone", {
        method: "DELETE",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: short }),
      })
    ).json();
    await updateState(setLinks, accessToken);
  };

  return (
    <article className={styles.card}>
      <div className={styles.btns}>
        <div onClick={() => updateUrl()} className={styles.updateBtn}>
          Update
        </div>
        <div onClick={() => deleteUrl()} className={styles.deleteBtn}>
          Delete
        </div>
      </div>

      <div className={styles.stats}>
        <span>Visits : </span>
        {visits}
      </div>

      <div className={styles.stats}>
        <span>Short : </span>
        <Link href={short}>
          <a
            onClick={() => {
              setTimeout(async () => {
                await updateState(setLinks, accessToken);
              }, 1000);
            }}
            target="_blank"
          >
            {short}
          </a>
        </Link>
      </div>

      <div className={styles.stats}>
        <span>Original : </span>
        <Link href={original}>
          <a target="_blank">{original}</a>
        </Link>
      </div>
    </article>
  );
};

export default UrlCard;
