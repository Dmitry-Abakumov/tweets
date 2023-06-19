import Spinner from "../Spinner/Spinner";

import css from "./Button.module.css";

const Button = ({
  children,
  onClick,
  funcParams,
  isLoading,
  isFollowing = false,
}) => {
  return (
    <button
      className={isFollowing ? css.activeBtn : css.btn}
      onClick={() => onClick(funcParams)}
    >
      {children}

      {isLoading && <Spinner width='16' />}
    </button>
  );
};

export default Button;
