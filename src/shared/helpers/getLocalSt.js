const getLocalSt = () => {
  return JSON.parse(localStorage.getItem("followings"));
};

export default getLocalSt;
