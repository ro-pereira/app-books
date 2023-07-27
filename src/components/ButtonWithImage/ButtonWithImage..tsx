import "./buttonWithImage.sass";

export interface IButtonWithImageProps {
  title: string,
  handleActions: HTMLImageElement,
  handleImages: HTMLImageElement
  styleButton: string
}

const ButtonWithImage = ({
  title,
  handleActions,
  handleImages,
  styleButton,
}: any) => {
  return (
    <button className={`${styleButton}`} onClick={handleActions}>
      <span>{title}</span>
      <img src={handleImages} alt="icon filter" />
    </button>
  );
};

export default ButtonWithImage;
