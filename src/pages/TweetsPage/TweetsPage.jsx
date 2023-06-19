import { Link } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

import Tweets from "../../modules/Tweets/Tweets";

import css from "./TweetsPage.module.css";

const TweetsPage = () => {
  return (
    <div className={css.section}>
      <Link className={css.navigationLink} to='/'>
        Back to home
        {<TiArrowBackOutline color='#471CA9' size='20' />}
      </Link>
      <Tweets />
    </div>
  );
};

export default TweetsPage;
