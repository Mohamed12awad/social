import axios from "axios";

// const isUserSignedIn = () => {
//   const token = localStorage.getItem("token");
//   // console.log(!!token);
//   return !!token;
// };

const userData = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/singleuser",
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        return await response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Error data:", error.response.data);
        localStorage.removeItem("token");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      return null;
    }
  } else {
    return null;
  }
};
userData().then((data) => {
  data;
});

export { userData };
