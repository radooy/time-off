import { StyledHeading } from "./homeStyles";
import { useSelector } from "react-redux";

function Home() {
  const name = useSelector((state) => state.auth.name);
  const days = useSelector((state) => state.auth.paidLeave)

  return (
    <>
      <StyledHeading>
        Hello {name}!
      </StyledHeading>
      <div>
        Here in the home page will be displayed the information about how to request a time off or sick leave.
        <p>You have <b>{days} days</b> remaining!</p>
      </div>
    </>

  )
}

export default Home;
