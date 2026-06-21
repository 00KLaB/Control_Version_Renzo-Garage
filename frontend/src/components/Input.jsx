export default function Input(props) {
  return (
    <input
      {...props}
      className="
        bg-blue-100
        border
        border-zinc-700
        rounded-xl
        px-4
        py-3
        text-black
        outline-none
        focus:border-blue-500
        placeholder:text-black
      "
    />
  );
}