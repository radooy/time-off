import { useSelector } from "react-redux";
import { StyledHeading } from "./homeStyles";

function Home() {
  const { name, paidLeave: days } = useSelector((state) => state.auth);

  return (
    <>
      <StyledHeading className="pl-10">
        Hello {name}!
      </StyledHeading>
      <div className="pl-10">
        Here in the home page will be displayed the information about how to request a time off or sick leave.
        <p>You have <b>{days} days</b> remaining!</p>
      </div>
    </>

  )
};

export default Home;
