import React, { FC } from "react";
import UrlCard from "./UrlCard";
import { LinksType } from "../Types/index";

interface Props {
  links:
    | [
        {
          visits: number;
          _id: string;
          shortUrl: string;
          longUrl: string;
        }
      ]
    | undefined;
  accessToken: string;
  setLinks: React.Dispatch<React.SetStateAction<[LinksType] | undefined>>;
}

const Cards: FC<Props> = ({ setLinks, links, accessToken }) => {
  return (
    <>
      {links
        ? links.length
          ? links.map((link) => {
              return (
                <UrlCard
                  key={link._id}
                  setLinks={setLinks}
                  accessToken={accessToken}
                  visits={link.visits}
                  short={link.shortUrl}
                  original={link.longUrl}
                />
              );
            })
          : "Your don't have any Url"
        : "Loading..."}
    </>
  );
};

export default Cards;
