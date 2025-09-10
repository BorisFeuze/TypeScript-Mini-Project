import { UserCard } from "../components/index";
import { getFavouriteCards } from "../utils/utils";
import type { Fc } from "../types";

function UserCardDisplay() {
  const favouriteCards = getFavouriteCards();
  return (
    <div className="p-8 mt-[2.5rem]">
      <h1 className="inline-block text-black px-3 py-1 transition duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,3)] font-bold">
        MY FAVOURITE ARTWORK
      </h1>
      <section className="p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center">
        {favouriteCards.map((fc: Fc) => (
          <UserCard key={fc.id} fc={fc} />
        ))}
      </section>
    </div>
  );
}

export default UserCardDisplay;
