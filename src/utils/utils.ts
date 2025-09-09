const getFavouriteCards = () => {
  return JSON.parse(localStorage.getItem("favourites")) || [];
};

const addfavouriteCard = (array, param) => {
  const storedFavouriteCards = getFavouriteCards();

  console.log(storedFavouriteCards);
  let updatedFavouriteCards = [];

  const currCard = array.find((c) => {
    return c.id === param.id;
  });
  const isStorted = storedFavouriteCards.some((card) => {
    return card.id === param.id;
  });
  console.log(isStorted);
  console.log(currCard);
  if (isStorted) {
    updatedFavouriteCards = storedFavouriteCards.map((c) => {
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

export { addfavouriteCard, getFavouriteCards };
