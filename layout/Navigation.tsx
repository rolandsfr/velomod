import styled from "styled-components";
import { Container } from "../styles/styled";
import Image from "next/image";
import { useContext } from "react";
import { useRef } from "react";
import { NavContext } from "../pages";
import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;

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

    nav {
      display: flex;
      align-items: center;
      gap: 2em;

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
    }
  }
`;

interface NavigationProps {
  points: JSX.Element[];
}

const Navigation: React.FC<NavigationProps> = ({ points }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(NavContext);
  const { locale } = useRouter();

  context.setRef(navRef);

  return (
    <Wrapper>
      <Container ref={navRef}>
        <header>
          <div className="logo">
            <Image src={"/logo.svg"} width="80" height="30"></Image>
            <span className="logotype">Velomod</span>
          </div>
          <nav>
            <ul>{points}</ul>
            <div className="languages">
              <Link href="lv">
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
              <Link href="en">
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
          </nav>
        </header>
      </Container>
    </Wrapper>
  );
};

export default Navigation;
