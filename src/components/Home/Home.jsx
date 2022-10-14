import { StyledHeading } from "./homeStyles";
import { useSelector } from "react-redux";

function Home() {
  const name = useSelector((state) => state.auth.name);

  return (
    <>
      <StyledHeading>
        Hello {name}!
      </StyledHeading>
      <div>
        Here in the home page will be displayed the information about how to request a time off or sick leave
      </div>
    </>

  )
}

export default Home;
