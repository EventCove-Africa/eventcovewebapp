// AuthTooltip Component
const AuthTooltip = ({
  image,
  title,
  description,
  position,
  animationClass,
}: {
  image: string;
  title: string;
  description: string;
  position: React.CSSProperties; // Inline CSS for positioning
  animationClass?: string; // Optional animation class
}) => (
  <div
    className={`w-[220px] min-h-[70px] h-auto rounded-md absolute shadow-lg p-4 bg-white ${animationClass}`}
    style={{ ...position }}
    title={title}
  >
    <img src={image} alt={`${title}-icon`} className="mb-2 w-6 h-6" />
    <h4 className="text-dark_100 text-sm font-normal">{description}</h4>
  </div>
);

export default AuthTooltip;
