import styled from '@emotion/styled'
import { ButtonDefault } from "@/components/login/Form/styled";
import {
  orangeColor,
  orangeColorLight,
  primaryColor,
  redColor,
  redColorLight,
  yellowColor,
  yellowColorLight
} from "@/utils/constant/colors";
import { DataGrid } from "@mui/x-data-grid";
import { Tab, Tabs } from "@mui/material";

export const FabButton = styled(ButtonDefault)`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background-color: ${primaryColor};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  &:hover {
    background-color: ${primaryColor};
  }
`;

export const StyledDataGrid = styled(DataGrid)`
  cursor: pointer;
  font-size: 1rem!important;
  
  .row--INTERVENTION {
    background-color: ${redColorLight};

    &:hover {
      background-color: ${redColorLight};
    }
  }

  .row--BAD {
    background-color: ${orangeColorLight};

    &:hover {
      background-color: ${orangeColorLight};
    }
  }

  .row--ALERT {
    background-color: ${yellowColorLight};

    &:hover {
      background-color: ${yellowColorLight};
    }
  }

  .column--INTERVENTION {
    color: ${redColor};
    font-weight: bold;
  }

  .column--BAD {
    color: ${orangeColor};
    font-weight: bold;
  }

  .column--ALERT {
    color: ${yellowColor};
    font-weight: bold;
  }

  .column_registration {
    opacity: 0.8;
    font-weight: bold;
    border-right: solid white 5px;
  }
`;

export const TabsComponent = styled(Tabs)`
  display: flex;
  height: 10vh;
  button {
    max-width: 100% !important;
    flex: 1;
  }
`;

export const TabComponent = styled(Tab)`
  height: 10vh;
  font-size: 1.2rem;
`;

export const ChartBox = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
