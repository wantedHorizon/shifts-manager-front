import server from "../api/enterExitApi";

const enter = async (user_id) => {
  try {
    const res = await server.post(`/shifts/enter/${user_id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const exit = async (user_id) => {
  try {
    const res = await server.post(`/shifts/exit/${user_id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const getShifts = async () => {
  try {
    const res = await server.get(`/shifts`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};


export { enter, exit, getShifts };
