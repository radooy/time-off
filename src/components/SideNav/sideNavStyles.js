import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(NavLink)`
    display: block;
    text-decoration: none;
    color: black;

    &:not(:last-of-type) {
      margin-bottom: 20px;
    }

    &:hover {
        font-weight: bolder;
    }

`