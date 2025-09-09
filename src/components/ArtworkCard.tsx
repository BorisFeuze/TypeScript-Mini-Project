import { useEffect, useState } from "react";
import type { ArtWork } from "../types";
import { addfavouriteCard } from "../utils/utils";
import { getFinalData } from "../data/ArtworkData";
import { useArtwork } from "../context/artworkContext";

const ArtworkCard = ({ artwork }: { artwork: ArtWork }) => {
  const imageUrl = "https://www.artic.edu/iiif/2/";

  const [card, setCard] = useState({});

  const { artworks } = useArtwork();

  const { id, title, artist_title, image_id } = card;

  const addToFavourite = () => {
    addfavouriteCard(artworks, artwork);
  };

  // console.log(imageUrl + image_id);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const URL = artwork.api_link;
        const finalData = await getFinalData(URL, abortController);

        console.log(finalData);
        setCard(finalData);
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
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addToFavourite}>
            Add to favourite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
