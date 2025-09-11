import { useEffect, useState } from "react";
import type { ArtWork, Card } from "../types";
import { addfavouriteCard } from "../utils";
import { getFinalData } from "../data/ArtworkData";
import { useArtwork } from "../context";
import { toast } from "react-toastify";

const ArtworkCard = ({ artwork }: { artwork: ArtWork }) => {
  const imageUrl1 = "https://www.artic.edu/iiif/2/";
  const imageUrl2 = "/full/400,/0/default.jpg";

  const [card, setCard] = useState<Card | null>(null);

  const { artworks } = useArtwork();

  const addToFavourite = () => {
    addfavouriteCard(artworks, artwork);
  };

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const URL = artwork?.api_link;
        const finalData = await getFinalData(URL, abortController);
        setCard(finalData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(errorMessage);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  if (!card) return;
  const { title, artist_title, image_id } = card;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageUrl1 + image_id + imageUrl2} alt={title} />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{title}</h1>
        <h2 className="text-sm">{artist_title}</h2>
        <div className="card-actions justify-end mt-auto">
          <button className="btn btn-primary mt-auto" onClick={addToFavourite}>
            Add to favourite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
