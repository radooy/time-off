import React from "react";
import { useSelector } from "react-redux";

import { Table, TableHead, TableRow, TableBody, useTheme } from "@mui/material";
import {
  StyledBoldTableCell,
  StyledHeading,
  StyledTableCell,
} from "./historyStyles";

import { constants } from "../../utils/constants";

function History() {
  const history = useSelector((state) => state.auth.history);
  const theme = useTheme();
  const smallScreenBP = theme.breakpoints.down("sm");
  console.log(smallScreenBP);

  function displayType(leaveType) {
    if (leaveType === constants.paidLeaveValue) return constants.paidLeave;
    if (leaveType === constants.sickLeaveValue) return constants.sickLeave;
  }

  return (
    <>
      <StyledHeading style={{ paddingLeft: "16px" }}>
        {constants.history}
      </StyledHeading>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledBoldTableCell sx={{ fontWeight: "bold" }}>
              {constants.type}
            </StyledBoldTableCell>
            <StyledBoldTableCell sx={{ fontWeight: "bold" }} align="left">
              {constants.startDate}
            </StyledBoldTableCell>
            <StyledBoldTableCell sx={{ fontWeight: "bold" }} align="left">
              {constants.endDate}
            </StyledBoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((h, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {displayType(h.type)}
              </StyledTableCell>
              <StyledTableCell align="left">{h.startDate}</StyledTableCell>
              <StyledTableCell align="left">{h.endDate}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default History;
