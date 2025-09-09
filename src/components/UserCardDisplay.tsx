import { UserCard } from "../components/index";
import { getFavouriteCards } from "../utils/utils";

function UserCardDisplay() {
  const favouriteCards = getFavouriteCards();
  console.log(favouriteCards);

  return (
    <div className="p-8">
      <section className="p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center">
        {favouriteCards.map((fc) => (
          <UserCard key={fc.id} fc={fc} />
        ))}
      </section>
    </div>
  );
}

export default UserCardDisplay;
