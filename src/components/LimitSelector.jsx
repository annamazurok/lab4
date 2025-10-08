import "./LimitSelector.css";

export default function LimitSelector({ limit, setLimit }) {
  return (
    <>
    <div className="limit-selector">
      <select
      value={limit}
      onChange={(e) => setLimit(Number(e.target.value))}
    >
      <option value={3}>3 per page</option>
      <option value={5}>5 per page</option>
      <option value={8}>8 per page</option>
    </select>
    </div>
    </>
  );
}

