import { useState, useEffect } from "react";
import { getFinalData } from "../data/ArtworkData";

const UserCard = ({ fc }) => {
  const imageUrl = "https://www.artic.edu/iiif/2/";

  const [favouriteCard, setFavouriteCard] = useState({});

  const { id, title, artist_title, image_id } = favouriteCard;

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const URL = fc.api_link;
        const finalData = await getFinalData(URL, abortController);

        console.log(finalData);
        setFavouriteCard(finalData);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageUrl + image_id} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default UserCard;
