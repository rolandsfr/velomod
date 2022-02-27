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
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useSizer } from "../hooks/useSizer";

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
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10000;

  header {
    padding: 4em 0;
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
        padding: 3em 7em;
        margin-left: 0;
        position: absolute;
        bottom: 5em;
      }

      .menu {
        display: block !important;
      }
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
  const { locale } = useRouter();
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

  return (
    <Wrapper>
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
                <div className="languages">
                  <Link href="/" locale="lv">
                    <div className="flag">
                      <span className="icon">{getUnicodeFlagIcon("LV")}</span>
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
                      <span className="icon">{getUnicodeFlagIcon("US")}</span>
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
    </Wrapper>
  );
};

export default Navigation;
