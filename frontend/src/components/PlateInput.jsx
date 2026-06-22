export default function PlateInput({
  value,
  onChange,
  label = "Matrícula",
}) {

  const handleChange = (e) => {

  let plate = e.target.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (plate.length > 6) {
    plate = plate.slice(0, 6);
  }

  if (plate.length > 4) {
    plate =
      `${plate.slice(0, 2)}-${plate.slice(2, 4)}-${plate.slice(4)}`;
  } else if (plate.length > 2) {
    plate =
      `${plate.slice(0, 2)}-${plate.slice(2)}`;
  }

  onChange(plate);
};

  return (

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Matrícula"
        maxLength={8}
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