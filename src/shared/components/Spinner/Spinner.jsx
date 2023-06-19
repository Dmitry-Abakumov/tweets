import { RotatingLines } from "react-loader-spinner";

import css from "./Spinner.module.css";

const Spinner = ({ width }) => {
  return (
    <div className={css.wrapper}>
      <RotatingLines strokeColor='#551a8b' width={width} />
    </div>
  );
};

export default Spinner;
