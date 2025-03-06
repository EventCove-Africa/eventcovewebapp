import { InfoCircle } from "iconsax-react";
import { Tooltip } from "react-tooltip";

interface TooltipProps {
  content: string;
  dataTooltipId?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  content,
  dataTooltipId = "custom-tooltip",
}) => {
  return (
    <>
      <InfoCircle
        size="12"
        color="#A30162"
        data-tooltip-id={dataTooltipId}
        className="cursor-pointer text-primary_100"
      />
      <Tooltip
        style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)" }}
        className="text-white font-bold"
        id={dataTooltipId}
        place="top"
      >
        {content}
      </Tooltip>
    </>
  );
};

export default CustomTooltip;
