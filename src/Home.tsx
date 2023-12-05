import { Typography } from "@mui/material";
import First from "./Components/First";
import Second from "./Components/Second";

const Home = () => {
  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"} textAlign={"center"}>
        Home
      </Typography>
      <First />
      <div style={{height: '20vh'}}></div>
      <Second />
    </div>
  );
};

export default Home;
