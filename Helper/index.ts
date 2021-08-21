import { LinksType } from "../Types";

export const updateState = async (
  setLinks: React.Dispatch<React.SetStateAction<[LinksType] | undefined>>,
  accessToken: string
) => {
  const res = await (
    await fetch("https://shortie-api.herokuapp.com/api/v1/link/userdetails", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
  ).json();
  if (res.status === 200) {
    setLinks(res.data.user.links);
  }
};
