import { Card } from "@mui/material";
import { StyledLink } from "./sideNavStyles";

function SideNav() {
    return (
        <Card sx={{
            padding: "20px",
            minWidth: "15%",
            width: {
                xs: "100%",
                md: "15%"
            },
            textAlign: "center"
        }}
        >
            <StyledLink to="/" end>Home</StyledLink>
            <StyledLink to="request">Request time off</StyledLink>
            <StyledLink to="history">History</StyledLink>
        </Card>
    )
}

export default SideNav;
