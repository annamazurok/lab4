import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <>
    <input
      type="text"
      placeholder="Search todo..."
      className="search-bar"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </>
  );
}
