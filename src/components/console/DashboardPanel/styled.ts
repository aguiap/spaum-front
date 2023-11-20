import styled from '@emotion/styled'
import {
  primaryColor,
  secondColor, secondColorDark,
  tertiaryColor,
} from "@/utils/constant/colors";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import Image from "next/image";

export const Panel = styled.article`
  width: 3rem;
`;

export const PanelAccordion = styled(Accordion)`
  background-color: ${primaryColor};

  .MuiAccordionDetails-root {
    border-radius: 50%;
    height: 2.5rem;
  }
`;

export const PanelAccordionSummary = styled(AccordionSummary)`
  background-color: ${primaryColor};
  border-radius: 20px 200px 200px 200px;
`;

export const PanelAccordionDetails = styled(AccordionDetails)<{$active?: boolean}>`
  display: flex;
  padding: 0.5rem 0;

  > div {
    background-color: ${props => props.$active ? secondColorDark : 'none'};
    height: 3rem;
    display: flex;
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
  }

  > div:hover {
    background-color: ${secondColor};
  }
`;

export const PanelImage = styled(Image)`
  margin: auto;
`;

export const PanelFlex = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  top: 1rem;
  left: 1rem;
  flex-direction: row-reverse;
`;

export const PanelTitles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-left: 0.5rem;
`;

export const PanelTitle = styled(Typography)`
  background-color: ${secondColor};
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  margin-top: 0.9rem;
  color: ${tertiaryColor};
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  font-size: 0.9rem;
  border-radius: 0.2rem;
`;

export const ArticleShowPanel = styled.article`
  position: fixed;
  width: 0.6rem;
  height: 4.5rem;
  top: 1rem;
  background-color: ${primaryColor};
  border-radius: 0 0.4rem 0.4rem 0;
  cursor: pointer;
  display: flex;

  &:hover {
    width: 2rem !important;
    height: 5rem !important;
  }
`;
