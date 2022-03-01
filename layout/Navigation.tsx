import styled from "styled-components";
import { Container } from "../styles/styled";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { NavContext } from "../pages";
import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useSizer } from "../hooks/useSizer";
import { useLocale } from "../hooks/useLocale";

const BlurBackdrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(7px);
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 101;
  cursor: pointer;
`;

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: 2em;
  position: relative;
  z-index: 100000;
  width: 300px;

  ul {
    display: flex;
    gap: 6em;

    li {
      list-style: none;
      cursor: pointer;
    }
  }

  .languages {
    display: flex;
    gap: 2em;
    margin-left: 6em;

    .flag {
      cursor: pointer;

      .flag-name {
        margin-left: 0.5em;
      }
    }
  }

  .close-modal {
    position: absolute;
    right: 3.6em;
    top: 5.6em;
    z-index: 1000;
    width: 2.3em;
    padding: 0.5em;
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    width: auto !important;

    .close-modal {
      display: none;
    }
  }

  .scroll-to-top {
    display: none;
  }
`;

const NavWrapper = styled(motion.div)`
  padding: 4em;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10000;
  /* TODO: Remove after done with team section */
  /* display: none; */

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
      flex-direction: column;

      .logotype {
        font-family: "Neutral" !important;
        margin-top: 0.5em;
      }
    }

    .menu {
      font-size: 3rem !important;
      cursor: pointer;
      width: 0.6em;
      display: none;
    }
  }

  @media only screen and (max-width: 1024px) {
    header {
      ${Nav} {
        position: absolute;
        right: 0;
        top: 0;
        background: #fafafa;
        flex-direction: column;
        height: 100vh;
        width: 300px;
        align-items: flex-start;
        justify-content: space-between;

        ul {
          flex-direction: column;
          justify-content: flex-start;
          gap: 0;
          margin-top: 12em;
          padding-left: 0;
          width: 100%;

          * {
            transition: 0.7s all !important;
          }

          .active-point {
            background-color: #d04cff;
            color: #fff;
            font-weight: 700;
          }

          li {
            padding: 1em 4em;
            width: 100%;
            transition: 0.3s all;
          }
        }
      }

      .languages {
        margin: 3em 7em;
        bottom: 5em;
      }

      .scroll-to-top {
        display: flex;
        margin: 3em 7em;
        cursor: pointer;
        display: block;
        margin-bottom: 5em;
        margin-top: -1em;

        svg {
          width: 1.1em;
          margin-left: 1.4em;
        }
      }

      .menu {
        display: block !important;
      }
    }
  }

  @media only screen and (max-width: 1024px) and (max-height: 425px) {
    .additional-nav {
      position: absolute;
      top: 3em;
      left: -0.7em;
    }

    ul {
      margin-top: 15em !important;
    }
  }
`;

interface NavigationProps {
  points: JSX.Element[];
}

const Navigation: React.FC<NavigationProps> = ({ points }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(NavContext);
  const sizer = useSizer();
  const localized = useLocale();
  const { locale } = useRouter();
  const controls = useAnimation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sizer.w > 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sizer.w]);

  useEffect(() => {
    if (context.dispatch) {
      context.dispatch({
        type: "SET_NAV_REF",
        payload: navRef,
      });
    }
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > 100) {
        // add bg to nav bar
        controls.start({
          background: "rgba(240, 240, 240, 0.6)",
          backdropFilter: "blur(25px)",
          transition: { duration: 0.7 },
        });
      } else {
        controls.start({
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(0px)",
        });
      }
    };

    document.addEventListener("scroll", checkScroll);

    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <Wrapper>
      <NavWrapper animate={controls}>
        <Container ref={navRef}>
          <AnimatePresence>
            {sidebarOpen && sizer.w < 1024 && (
              <BlurBackdrop
                onClick={(e) => {
                  e.preventDefault();
                  setSidebarOpen(false);
                }}
                initial={{
                  backdropFilter: "blur(0px)",
                  background: "rgba(0, 0, 0, 0)",
                }}
                animate={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(0, 0, 0, 0.5)",
                }}
                exit={{
                  backdropFilter: "blur(0px)",
                  background: "rgba(0, 0, 0, 0)",
                }}
              />
            )}
          </AnimatePresence>
          <header>
            <div className="logo">
              <Image src={"/logo.svg"} width="80" height="30"></Image>
              <span className="logotype">Velomod</span>
            </div>
            <AnimatePresence exitBeforeEnter={true}>
              {sidebarOpen && (
                <Nav
                  initial={{
                    right: -300,
                  }}
                  animate={{
                    right: 0,
                  }}
                  exit={{
                    right: -300,
                    transition: { duration: 0.3 },
                  }}
                >
                  <ul>
                    {points.map((point, index) => {
                      if (index === context.active) {
                        return (
                          <span key={index} className="active-point">
                            {point}
                          </span>
                        );
                      }

                      return point;
                    })}
                  </ul>

                  <div className="additional-nav">
                    <div className="languages">
                      <Link href="/" locale="lv">
                        <div className="flag">
                          <span className="icon">
                            {getUnicodeFlagIcon("LV")}
                          </span>
                          <span
                            style={{
                              fontWeight: locale == "lv" ? "bold" : "normal",
                            }}
                            className="flag-name"
                          >
                            LV
                          </span>
                        </div>
                      </Link>
                      <Link href="/" locale="en">
                        <div className="flag">
                          <span className="icon">
                            {getUnicodeFlagIcon("US")}
                          </span>
                          <span
                            style={{
                              fontWeight: locale == "en" ? "bold" : "normal",
                            }}
                            className="flag-name"
                          >
                            EN
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="scroll-to-top">
                      <span>{localized.scroll}</span>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                  </div>

                  <div
                    className="close-modal"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </Nav>
              )}
            </AnimatePresence>
            <div
              className="menu"
              onClick={() => {
                setSidebarOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </header>
        </Container>
      </NavWrapper>
    </Wrapper>
  );
};

export default Navigation;
