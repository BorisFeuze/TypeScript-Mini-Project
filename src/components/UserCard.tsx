import {
  useState,
  useEffect,
  type ChangeEventHandler,
  type MouseEventHandler,
} from "react";

import { getFinalData } from "../data/ArtworkData";
import { getFavouriteCards, removeFavouriteCard } from "../utils";
import type { Card, Fc } from "../types";
import { toast } from "react-toastify";

const UserCard = ({ fc }: { fc: Fc }) => {
  const imageUrl1 = "https://www.artic.edu/iiif/2/";
  const imageUrl2 = "/full/400,/0/default.jpg";

  const [favouriteCard, setFavouriteCard] = useState<Card | null>(null);

  const [formData, setFormData] = useState({ info: "" });
  const [_, setStoredCards] = useState(getFavouriteCards());

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRemoveCard: MouseEventHandler<HTMLButtonElement> = (event) => {
    removeFavouriteCard(fc);
    (event.target as HTMLElement).parentElement?.remove();
  };

  const handleSave = () => {
    const { info } = formData;

    if (!formData.info.trim())
      throw new Error("Please enter the note before saving");

    setStoredCards((prev: Fc[]) => {
      const updtateStoredCards = prev.map((p: Fc) => {
        if (p.id === fc.id) {
          return { ...p, note: info };
        } else {
          return p;
        }
      });
      toast.success("Your note have been successfully saved ");
      localStorage.setItem("favourites", JSON.stringify(updtateStoredCards));
      return updtateStoredCards;
    });
    setFormData({ info: "" });
  };

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const URL = fc.api_link;
        const finalData = await getFinalData(URL, abortController);
        setFavouriteCard(finalData);
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

  if (!favouriteCard) return;
  const { title, artist_title, image_id } = favouriteCard;

  return (
    <div className="card bg-base-100 w-96 shadow-sm relative">
      <figure>
        <img src={imageUrl1 + image_id + imageUrl2} alt={title} />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{title}</h1>
        <h2 className="text-sm">{artist_title}</h2>
        <div className="card-actions justify-end"></div>
      </div>
      <div className="flex flex-col gap-y-[.5rem] justify-center">
        <p className="text-xs text-center font-bold text-green-500">
          {fc.note}
        </p>
        <input
          id="info"
          type="text"
          name="info"
          value={formData.info}
          onChange={handleChange}
          placeholder="note..."
          className="flex-1 text-sm focus:outline-none leading-normal py-[.5rem] px-2 placeholder:text-gray-400 border-1 rounded"
        />
        <button
          className="mb-2 px-2 pb-1 bg-black hover:bg-green-400 active:bg-green-300 text-white rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <button
        className="border-1 rounded w-[1.5rem] bg-red-500 pb-1 mt-[.25rem] absolute ml-[22rem] cursor-pointer hover:bg-red-400"
        onClick={handleRemoveCard}
      >
        x
      </button>
    </div>
  );
};

export default UserCard;
