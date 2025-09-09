import { type ChangeEventHandler } from "react";
import { ArtworkCard } from "../components";
import { useArtwork } from "../context/artworkContext";
import { Link } from "react-router";

function Home() {
  const { setForm, artworks, form } = useArtwork();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  return (
    <div className="p-8">
      <header className="text-center">
        <h1 className="text-6xl">Runtime Validation with Zod</h1>
        <div className="flex flex-row justify-center gap-x-[4rem]">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              value={form.search}
              onChange={handleChange}
              required
              placeholder="Search"
            />
          </label>
          <div>
            <Link to="/cart">
              <button className="btn">My Card</button>
            </Link>
          </div>
        </div>
      </header>
      <section className="p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </section>
    </div>
  );
}

export default Home;
