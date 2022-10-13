// mock the user api
let userFetcher = async () => {
  // sleep 500
  await new Promise((res) => setTimeout(res, 500));

  if (localStorage.getItem("user") !== null) {
    // authorized
    return {
      name: localStorage.getItem("user"),
    };
  }

  // not authorized
  const error = new Error("Not authorized!");
  // error.status = 403;
  throw error;
};

export default userFetcher;
