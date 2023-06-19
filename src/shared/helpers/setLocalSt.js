const setLocalSt = (data) => {
  localStorage.setItem("followings", JSON.stringify(data));
};

export default setLocalSt;
