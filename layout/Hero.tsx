import { NextPage } from "next";
import { Container } from "../styles/styled";
import styled from "styled-components";
import { useLocale } from "../hooks/useLocale";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { NavContext } from "../pages";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  position: relative;

  .content {
    overflow: hidden;
  }

  .titles {
    * {
      font-family: "Neutral";
    }

    h2 {
      font-size: 5rem;
      font-weight: normal;
    }

    h1 {
      font-size: 7rem;
      margin-top: -0.2em;
    }
  }
  .hero-img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
`;

const Hero: NextPage = () => {
  const localized = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const context = useContext(NavContext);
  const [imageDimensions, setImageDimensions] = useState({
    w: 0,
    h: 0,
    scale: 0,
  });

  useEffect(() => {
    if (wrapperRef.current && context.ref) {
      const navRef = context.ref;
      if (navRef.current) {
        const navOffset = navRef.current.offsetLeft;
        const untilOffsetStart = document.body.offsetWidth - navOffset;
        const preferableImageWidth = untilOffsetStart - 200;

        // aspec ration at the time of testing is 2003 : 3004
        const relativeHeight = (preferableImageWidth * 3004) / 2003;

        const screenDelta = relativeHeight / window.innerHeight;

        setImageDimensions({
          w: preferableImageWidth,
          h: relativeHeight,
          scale: screenDelta,
        });
      }
    }
  }, [wrapperRef.current, context.ref]);

  return (
    <Wrapper ref={wrapperRef}>
      <div
        style={{
          marginTop: -imageDimensions.h / (imageDimensions.scale * 2.5),
        }}
        className="hero-img"
      >
        <Image
          src="/hero-image.jpg"
          width={imageDimensions.w}
          height={imageDimensions.h}
        ></Image>
      </div>
      <Container>
        <div className="content">
          <div className="titles">
            <h2>{localized.hero.subtitle}</h2>
            <h1>{localized.hero.title}</h1>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Hero;
