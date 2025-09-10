import type { ArtWork, Fc } from "../types";

const getFavouriteCards = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

const addfavouriteCard = (array: ArtWork[], param: ArtWork) => {
  const storedFavouriteCards = getFavouriteCards();

  console.log(storedFavouriteCards);
  let updatedFavouriteCards = [];

  const currCard = array.find((c) => {
    return c.id === param.id;
  });

  const isStorted = storedFavouriteCards.some((card: Fc) => {
    return card.id === param.id;
  });
  // console.log(isStorted);
  // console.log(currCard);
  if (isStorted) {
    updatedFavouriteCards = storedFavouriteCards.map((c: Fc) => {
      if (c.id === param.id) {
        return { ...c, count: c.count + 1 };
      } else {
        return c;
      }
    });
  } else {
    const updatedFavouriteCard = { ...currCard, count: 1 };
    updatedFavouriteCards = [...storedFavouriteCards, updatedFavouriteCard];
  }

  localStorage.setItem("favourites", JSON.stringify(updatedFavouriteCards));
};

const removeFavouriteCard = (param: Fc) => {
  // get the new state of the movie Data in localstorage
  const storedFavouriteCards = getFavouriteCards();

  // remove the movie data from Datalist in localstorage
  const updatedFavouriteCards = storedFavouriteCards.filter((sf: Fc) => {
    return sf.id !== param.id;
  });

  // save the new datalist
  localStorage.setItem("favourites", JSON.stringify(updatedFavouriteCards));
};

const debounce = (fn, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
export { addfavouriteCard, getFavouriteCards, removeFavouriteCard, debounce };
