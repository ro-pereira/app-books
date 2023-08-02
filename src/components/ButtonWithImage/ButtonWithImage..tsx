import { IButtonWithImageProps } from "../../interface";
import "./buttonWithImage.sass";

const ButtonWithImage = ({
  title,
  handleActions,
  handleImages,
  styleButton,
}: IButtonWithImageProps) => {
  return (
    <button className={`${styleButton}`} onClick={handleActions}>
      <span>{title}</span>
      <img src={handleImages} alt="icon filter" />
    </button>
  );
};

export default ButtonWithImage;
