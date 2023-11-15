import styled from "styled-components";
import { grayColor } from "@/utils/constant/colors";
import Modal from "@mui/material/Modal";

export const InputCourse = styled.input`
  width: 10rem;
  height: 2rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 0.8rem;
  border: ${grayColor} solid 2px;
`;

export const InputHours = styled.input`
  width: 3rem;
  height: 2rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 0.8rem;
  border: ${grayColor} solid 2px;
`;

export const InputSubject = styled.input`
  width: 16rem;
  height: 2rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 0.8rem;
  border: ${grayColor} solid 2px;
`;

export const UlCourses = styled.ul`
  margin: auto;
  padding-top: 3rem;
  padding-bottom: 1rem;

  li,
  form {
    display: flex;
    min-height: 2rem;
    margin-bottom: 1rem;

    &:nth-last-child(1) {
      margin-right: 4.85rem;
    }

    > div {
      margin: auto 0;
    }

    > hr {
      margin: auto 0.5rem auto auto;
      width: 2rem;
      height: 2px;
      background-color: ${grayColor};
      border: none;
    }
  }
`;

export const ModalSubjects = styled(Modal)``;
