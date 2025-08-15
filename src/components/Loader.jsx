// src/components/Loader.jsx
export default function Loader({ size = "8", color = "border-blue-500" }) {
  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent rounded-full animate-spin ${color}`}
      ></div>
    </div>
  );
}
