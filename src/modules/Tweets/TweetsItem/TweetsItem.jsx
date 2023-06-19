import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "../../../shared/components/Button/Button";

import getNumberWithCommas from "../../../shared/helpers/getNumberWithComas";
import setLocalSt from "../../../shared/helpers/setLocalSt";

import * as API from "../../../shared/services/tweets-api";

import css from "./TweetsItem.module.css";

const TweetsItem = ({
  followingsData,
  setFollowingsData,
  setTweets,
  item,
  page,
  limit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { id, avatar, tweets, followers } = item;

  const onFollowBtnClick = async () => {
    const newFollowings = isFollowing
      ? followingsData.filter((el) => el.id !== id)
      : [...followingsData, { ...item, isFollowing: true }];

    try {
      setIsLoading(true);
      await API.updateFollowersById(id, {
        followers: isFollowing ? followers - 1 : followers + 1,
      });

      setTweets(await API.getSomeTweets(1, limit * page));
    } catch {
      toast.error("Oops, something went wrong. Try reloading the page");
    } finally {
      setIsLoading(false);
    }

    setFollowingsData(newFollowings);
    setLocalSt(newFollowings);
  };

  const isFollowing = followingsData.find(
    (item) => item.id === id
  )?.isFollowing;

  return (
    <li key={id} className={css.tweetsItem}>
      <img className={css.avatar} src={avatar} alt='avatar' />
      <div className={css.textWrap}>
        <p className={css.text}>{getNumberWithCommas(tweets)} TWEETS</p>
        <p className={css.text}>{getNumberWithCommas(followers)} FOLLOWERS</p>
      </div>

      <Button
        isFollowing={isFollowing}
        funcParams={item}
        onClick={onFollowBtnClick}
        isLoading={isLoading}
      >
        {isFollowing ? "FOLLOWING" : "FOLLOW"}
      </Button>
    </li>
  );
};

export default TweetsItem;
