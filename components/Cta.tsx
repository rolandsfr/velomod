import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 1em;
  position: relative;
  font-weight: bold;
  display: inline-flex;
  cursor: pointer;
  z-index: 200;

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
    background-color: #d04cff;
    left: 0;
    bottom: 0;
    z-index: -1 !important;
  }

  &:hover {
    &:before {
      width: 65%;
    }

    svg {
      margin-left: 0.2em;
    }
  }
`;

const Cta: React.FC<{ href?: string } & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  href,
  onClick,
}) => {
  const contents = (
    <Wrapper onClick={onClick} className="cta">
      {children}
      <FontAwesomeIcon icon={faArrowRight} />
    </Wrapper>
  );
  return href ? <Link href={href}>{contents}</Link> : contents;
};

export default Cta;
