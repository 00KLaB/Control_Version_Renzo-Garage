export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700",

    danger:
      "bg-red-600 hover:bg-red-700",
    
    darkDanger:
      "bg-red-900 hover:bg-red-500",

    success:
      "bg-green-600 hover:bg-green-700",

    secundary:
      "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-xl
        text-white
        transition
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}