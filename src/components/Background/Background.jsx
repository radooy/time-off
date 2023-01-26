import { Card } from "@mui/material";

function Background({ children }) {
  return (
    <Card
      sx={{
        minHeight: "500px",
        backgroundColor: "#f0efef",
        padding: "20px",
        display: "flex",
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
        gap: "20px",
      }}
    >
      {children}
    </Card>
  );
}

export default Background;
