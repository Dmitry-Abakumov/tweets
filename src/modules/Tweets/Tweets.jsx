import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import TweetsItem from "./TweetsItem/TweetsItem";
import Dropdown from "./Dropdown/Dropdown";
import Button from "../../shared/components/Button/Button";
import Spinner from "../../shared/components/Spinner/Spinner";

import * as API from "../../shared/services/tweets-api";

import getLocalSt from "../../shared/helpers/getLocalSt";

import css from "./Tweets.module.css";

const LIMIT = 3;
const TOTAL_PAGES = 12 / LIMIT;

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [checkedOption, setCheckedOption] = useState("show all");
  const [followingsData, setFollowingsData] = useState(() => {
    const followings = getLocalSt();

    return followings ? followings : [];
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await API.getSomeTweets(1, LIMIT);
        setTweets(data);
      } catch {
        toast.error("Oops, something went wrong. Try reloading the page");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setTweets]);

  useEffect(() => {
    (async () => {
      if (page === 1 || checkedOption !== "show all") return;

      try {
        setIsLoading(true);
        setTweets(await API.getSomeTweets(1, LIMIT * page));
      } catch {
        toast.error("Oops, something went wrong. Try reloading the page");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, checkedOption]);

  useEffect(() => {
    switch (checkedOption) {
      case "followings":
        if (page === 1) {
          setTweets(followingsData.slice(0, 3));
        } else {
          setTweets(followingsData);
        }

        break;

      case "follow":
        (async () => {
          try {
            setIsLoading(true);
            const allTweets = await API.getAllTweets();
            const followingTweetsIdentifiers = followingsData?.map(
              (el) => el.id
            );
            const followTweets = allTweets.filter(
              (el) => !followingTweetsIdentifiers?.some((id) => el.id === id)
            );

            if (page === 1) {
              setTweets(followTweets.slice(0, 3));
            } else {
              setTweets(followTweets);
            }
          } catch {
            toast.error("Oops, something went wrong. Try reloading the page");
          } finally {
            setIsLoading(false);
          }
        })();
        break;

      default:
        (async () => {
          try {
            setIsLoading(true);
            setTweets(await API.getSomeTweets(1, LIMIT * page));
          } catch {
            toast.error("Oops, something went wrong. Try reloading the page");
          } finally {
            setIsLoading(false);
          }
        })();
    }
  }, [checkedOption, followingsData, page]);

  const onLoadMoreBtnClick = async () => {
    if (page === TOTAL_PAGES) return;

    setPage((prev) => prev + 1);
  };

  const isBtnShow = () => {
    switch (checkedOption) {
      case "followings":
        return followingsData.length >= 4 && page === 1;

      case "follow":
        if (tweets.length > 4) return false;

        return true;

      default:
        return tweets.length >= 3 && tweets.length < 12;
    }
  };

  return (
    <>
      {isLoading && <Spinner width='50' />}

      <div className={css.TweetsWrap}>
        <Dropdown
          checkedOption={checkedOption}
          setCheckedOption={setCheckedOption}
          setPage={setPage}
        />
        <ul className={css.tweetsList}>
          {tweets.map((item) => {
            return (
              <div className={css.tweetsItemWrap} key={item.id}>
                <TweetsItem
                  followingsData={followingsData}
                  setTweets={setTweets}
                  item={item}
                  setFollowingsData={setFollowingsData}
                  page={page}
                  limit={LIMIT}
                  setCheckedOption={setCheckedOption}
                />
              </div>
            );
          })}
        </ul>

        {isBtnShow() && (
          <Button onClick={onLoadMoreBtnClick} isLoading={isLoading}>
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export default Tweets;
