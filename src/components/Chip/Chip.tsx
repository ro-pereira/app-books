
import { IChipProps } from "../../interface";
import "./chip.sass";

const Chip = ({ content, title, selectedOptionsTextType }: IChipProps) => {
  return (
    <div
      className={`chip chip__${title} ${
        selectedOptionsTextType === content && "chip__change-color"
      }`}
    >
      <span>{content}</span>
    </div>
  );
};

export default Chip;
