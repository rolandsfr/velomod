import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import Head from "next/head";
import { createContext, useReducer } from "react";

import Navigation from "../layout/Navigation";
import Hero from "../layout/Hero";
import Showcase from "../layout/Showcase";
import Team from "../layout/Team";

import localizedEn from "./../locales/en/translations.json";
import localizedLv from "./../locales/lv/translations.json";
import { MutableRefObject } from "react";

const navState: {
  ref: null | MutableRefObject<null | HTMLDivElement>;
  active: number;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }> | null;
} = {
  ref: null,
  active: 0,
  dispatch: null,
};

const reducer = (
  state: typeof navState,
  action: {
    type: string;
    payload: any;
  }
): typeof navState => {
  switch (action.type) {
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.payload,
      };
    case "SET_NAV_REF":
      return {
        ...state,
        ref: action.payload,
      };
    default:
      return state;
  }
};

const NavContext = createContext(navState);

const Wrapper = styled.div``;

const Home: NextPage = () => {
  const { locale } = useRouter();

  const translatedDisplayPoints =
    locale == "lv" ? localizedLv.navigation : localizedEn.navigation;

  const sectionRefs: MutableRefObject<any>[] = [];
  //  temporarily fill in the array
  // for (let i = 0; i < translatedDisplayPoints.length; i++) {
  //   const ref = useRef();
  //   sectionRefs.push(ref);
  // }
  const points = translatedDisplayPoints.map((point, index) => {
    return (
      <li
        key={index}
        onClick={() =>
          dispatch({
            type: "SET_ACTIVE",
            payload: index,
          })
        }
        // ref={sectionRefs[index]}
      >
        {point}
      </li>
    );
  });

  const [state, dispatch] = useReducer(reducer, navState);

  return (
    <NavContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      <Head>
        <title>Velomod</title>
        <meta
          name="description"
          content="Velomod - Inovatīvi velosipēdu aksesuāri"
        />

        {/* TODO: Add favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Navigation points={points} />
        <Hero />
        <Showcase />
        <Team />
      </Wrapper>
    </NavContext.Provider>
  );
};

export default Home;
export { NavContext };
