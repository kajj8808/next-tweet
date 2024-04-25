export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => {};
}) {
  return (
    <button
      className="px-6 text-xs font-light tracking-wider text-white uppercase rounded-full h-11 bg-product-color hover:bg-opacity-90"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
