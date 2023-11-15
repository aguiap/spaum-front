import styled from "styled-components";
import { grayColor } from "@/utils/constant/colors";

export const CoursesSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  article {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2rem auto;

    hr {
      flex: 2;
      height: 3px;
      background-color: ${grayColor};
      border: none;
      margin: auto 0;
    }

    span {
      margin: auto 0;
    }
  }
}
`;
