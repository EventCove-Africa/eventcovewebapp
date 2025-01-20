import { ArrowLeft } from "iconsax-react";
import useNavigation from "../../hooks/useNavigation";

interface DescriptionBarProps {
  text: string;
}

export default function DescriptionBar({ text }: DescriptionBarProps) {
  const { navigate } = useNavigation();
  return (
    <>
      <h3 className="text-dark_200 md:text-base text-sm font-normal flex gap-1 md:items-center items-start mb-2">
        <ArrowLeft
          className="cursor-pointer"
          size="16"
          color="#0D080B"
          onClick={() => navigate(-1)}
        />
        {text}
      </h3>
    </>
  );
}
