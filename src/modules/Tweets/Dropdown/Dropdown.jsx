import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import css from "./Dropdown.module.css";

const Dropdown = ({ checkedOption, setCheckedOption, setPage }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const isRadioSelected = (value) => value === checkedOption;

  const onClick = () => {
    setIsShowMenu((prev) => !prev);
  };

  const onChange = (e) => {
    setCheckedOption(e.target.value);
    setPage(1);
  };

  return (
    <form className={css.dropdownWrap} onClick={onClick}>
      <div className={css.checkedOption}>
        {checkedOption}
        <AiFillCaretDown size='15' />
      </div>
      <div className={isShowMenu ? css.optionsWrap : css.disabled}>
        <label
          className={css.label}
          htmlFor='show all'
          onClick={(e) => onClick()}
        >
          show all
        </label>
        <label
          className={css.label}
          htmlFor='follow'
          onClick={(e) => onClick()}
        >
          follow
        </label>
        <label
          className={css.label}
          htmlFor='followings'
          onClick={(e) => onClick()}
        >
          followings
        </label>
      </div>

      <input
        className={css.radioBtn}
        type='radio'
        name='option'
        value='show all'
        id='show all'
        checked={isRadioSelected("show all")}
        onChange={onChange}
      />
      <input
        className={css.radioBtn}
        type='radio'
        name='option'
        value='follow'
        id='follow'
        checked={isRadioSelected("follow")}
        onChange={onChange}
      />
      <input
        className={css.radioBtn}
        type='radio'
        name='option'
        value='followings'
        id='followings'
        checked={isRadioSelected("followings")}
        onChange={onChange}
      />
    </form>
  );
};

export default Dropdown;
