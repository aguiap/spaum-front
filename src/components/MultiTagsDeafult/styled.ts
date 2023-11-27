import styled from '@emotion/styled'
import CreatableSelect from "react-select/creatable";

export const MultiTags = styled(CreatableSelect)`
  width: 20rem;

  input{
    height: 3.5rem;
    max-height: 10rem;
  }
  
  .css-13cymwt-control {
    max-height: 10rem;
    overflow: auto;
  }

  .css-1p3m7a8-multiValue{
    height: 2rem;
    font-size: 1.1rem;
    
    .css-wsp0cs-MultiValueGeneric{
      display: flex;
      margin: auto;
    }
  }
`;
