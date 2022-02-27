import { NextPage } from "next";
import { Container } from "../styles/styled";
import styled from "styled-components";
import { useLocale } from "../hooks/useLocale";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { NavContext } from "../pages";
import { useSizer } from "../hooks/useSizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  position: relative;

  .content {
    overflow: hidden;
  }

  .cta {
    display: flex;
    align-items: center;
    gap: 1em;
    position: relative;
    font-weight: bold;
    display: inline-flex;
    cursor: pointer;

    svg {
      width: 0.7em;
      transition: 0.3s all;
    }

    &::before {
      content: "";
      transition: 0.3s all;
      position: absolute;
      width: 50%;
      height: 0.5em;
      z-index: -1;
      background-color: #d04cff;
      left: 0;
      bottom: 0;
    }

    &:hover {
      &:before {
        width: 65%;
      }

      svg {
        margin-left: 0.2em;
      }
    }
  }

  .titles {
    * {
      font-family: "Neutral";
    }

    h2 {
      font-size: 5rem;
      font-weight: normal;
      max-width: 600px;
      line-height: 1.5;
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

  @media only screen and (max-width: 768px) {
    .titles {
      text-align: center;
      max-width: 80%;
      margin: 0 auto;
      justify-content: center;
      h2 {
        line-height: 1.3;
        font-size: 2rem;
      }
      h1 {
        font-size: 4rem;
      }
    }

    .hero-img {
      span {
        display: none !important;
      }
      background-image: url("/hero-image.jpg");
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
    }

    .content {
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 20vh;
      left: 0;
      right: 0;
    }

    .cta {
      background-color: #111;
      padding: 0.8em 4em;
      border-radius: 7px;
      text-align: center;
      color: #fff;
      font-size: 1.4rem;
      font-weight: normal;
      margin-top: 1em;

      &::before {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 1024px) and (min-height: 1000px) {
    .hero-img {
      span {
        display: none !important;
      }
      background-image: url("/hero-image.jpg");
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
    }
  }

  @media only screen and (max-width: 1024px) and (max-height: 450px) {
    .hero-img {
      span {
        display: none !important;
      }

      margin-top: 0 !important;
      background-image: url("/hero-image.jpg");
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
    }
  }

  @media only screen and (min-width: 700px) and (max-height: 450px) {
    .titles {
      margin-top: 10%;
      margin-bottom: -5%;
      h2 {
        font-size: 2.5rem;
      }
    }
  }
`;

const Hero: NextPage = () => {
  const localized = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const context = useContext(NavContext);
  const sizer = useSizer();
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
        let preferableImageWidth = untilOffsetStart - 200;

        // aspec ration at the time of testing is 2003 : 3004
        let relativeHeight = (preferableImageWidth * 3004) / 2003;
        const screenRatio = relativeHeight / window.innerHeight;

        if (screenRatio < 1) {
          preferableImageWidth = preferableImageWidth / screenRatio;
          relativeHeight = relativeHeight / screenRatio;
        }

        if (sizer.w < 768) {
          preferableImageWidth = sizer.w;
          relativeHeight = (preferableImageWidth * 3004) / 2003;
        }

        setImageDimensions({
          w: preferableImageWidth,
          h: relativeHeight,
          scale: screenRatio,
        });
      }
    }
  }, [wrapperRef.current, context.ref, sizer]);

  return (
    <Wrapper ref={wrapperRef}>
      <div
        style={{
          marginTop:
            imageDimensions.scale > 1.5
              ? -imageDimensions.h / (imageDimensions.scale * 2.5) || 0
              : 0,
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
          <span className="cta">
            {localized.hero.cta}
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Hero;
