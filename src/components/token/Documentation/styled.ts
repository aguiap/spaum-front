import styled from '@emotion/styled'

export const DocumentationComponent = styled.section`
  display: flex;
  flex-direction: column;
`

export const TitleBox = styled.div`
  margin-top: 2rem;
  display: flex;
  h3{
    font-weight: bold;
    font-size: 2rem;
    margin: auto;
  }
`

export const SubTitleBox = styled.div`
  margin-top: 2rem;
  display: flex;
  h3{
    font-weight: bold;
    font-size: 1.6rem;
    margin-left: 5rem;
  }
`

export const TextBox = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  li {
    margin-top: 10px;
    list-style-type: square;
  }
  ul {
    padding: 1rem 1rem 1rem 4rem;
  }
  >p{
    margin-top: 10px;
    font-size: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  
  b{
    font-weight: bold;
  }
`