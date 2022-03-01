import styled from "styled-components";
import { NextPage } from "next";
import { Container } from "../styles/styled";
import Cta from "../components/Cta";
import { useLocale } from "../hooks/useLocale";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    flex-direction: column;

    h1 {
      font-family: "Neutral";
      font-weight: bold;
      font-size: 6rem;
    }

    p {
      margin-top: -1em;
    }

    @media only screen and (max-width: 1024px) {
      h1 {
        line-height: 1.5;
        font-size: 2.5rem;
        margin-bottom: 1em;
      }
    }
  }
`;

const Showcase: NextPage = () => {
  const localized = useLocale();
  return (
    <Wrapper>
      <Container>
        <main>
          <h1>{localized.showcase.title}</h1>
          <p>{localized.showcase.subtitle}</p>
          <Cta>{localized.showcase.cta}</Cta>
        </main>
      </Container>
    </Wrapper>
  );
};

export default Showcase;
