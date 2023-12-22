// helpers.js
export const highlightSearchKeyword = (text, keyword) => {
  if (!keyword) return text; // If no keyword, return original text
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-cyan-400">
        {part}
      </span>
    ) : (
      part
    )
  );
};
