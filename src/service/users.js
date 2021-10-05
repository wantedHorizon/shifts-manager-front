import server from "../api/enterExitApi";

const registerNewUser = async (newUser) => {
  try {
    const res = await server.post("/users", newUser);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export { registerNewUser };
