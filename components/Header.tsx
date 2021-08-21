import React, { FC } from "react";
import styles from "../styles/index.module.css";
import AddBtn from "./AddBtn";
import { LinksType } from "../Types/index";
import { updateState } from "../Helper/index";

interface Props {
  accessToken: string;
  setLinks: React.Dispatch<React.SetStateAction<[LinksType] | undefined>>;
}

const Header: FC<Props> = ({ accessToken, setLinks }) => {
  const addUrl = async () => {
    const longUrl = prompt("Long Url");
    if (!longUrl) return alert("Please Provide a Url");

    const res = await (
      await fetch("https://shortie-api.herokuapp.com/api/v1/link/addone", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          url: longUrl,
        }),
      })
    ).json();

    if (res.status === 200) {
      await updateState(setLinks, accessToken);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.addBtn} onClick={() => addUrl()}>
        <AddBtn />
      </div>
    </header>
  );
};

export default Header;
