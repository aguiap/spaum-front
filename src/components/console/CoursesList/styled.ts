import styled from '@emotion/styled'
import { grayColor } from "@/utils/constant/colors";
import Modal from "@mui/material/Modal";

export const InputCourse = styled.input`
  width: 20rem;
  height: 4rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 1.1rem;
  border: ${grayColor} solid 2px;
`;

export const InputHours = styled.input`
  width: 5rem;
  height: 4rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 1rem;
  border: ${grayColor} solid 2px;
`;

export const InputSubject = styled.input`
  width: 20rem;
  height: 4rem;
  margin: auto 0.5rem auto 0;
  border-radius: 0.3rem;
  padding-left: 1rem;
  font-size: 1rem;
  border: ${grayColor} solid 2px;
`;

export const UlCourses = styled.ul`
  margin: auto;
  padding-bottom: 1rem;

  li,
  form {
    justify-content: center;
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

export const ModalSubjects = styled(Modal)`
  #modal-modal-title{
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  li{
    width: 100%;
  }
`;
