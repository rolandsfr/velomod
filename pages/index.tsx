import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import Head from "next/head";
import { createContext } from "react";

import Navigation from "../layout/Navigation";
import Hero from "../layout/Hero";

import localizedEn from "./../locales/en/translations.json";
import localizedLv from "./../locales/lv/translations.json";
import { MutableRefObject } from "react";

const navState: {
  ref: null | MutableRefObject<null | HTMLDivElement>;
  setRef: (ref: MutableRefObject<HTMLDivElement | null>) => void;
} = {
  ref: null,
  setRef: (ref: MutableRefObject<HTMLDivElement | null>) => {
    navState.ref = ref;
  },
};
const NavContext = createContext(navState);

const Wrapper = styled.div``;

const Home: NextPage = () => {
  const { locale } = useRouter();

  const translatedDisplayPoints =
    locale == "lv" ? localizedLv.navigation : localizedEn.navigation;

  const sectionRefs: MutableRefObject<any>[] = [];
  //  temporarily fill in the array
  for (let i = 0; i < translatedDisplayPoints.length; i++) {
    const ref = useRef();
    sectionRefs.push(ref);
  }
  const points = translatedDisplayPoints.map((point, index) => {
    return (
      <li key={index} ref={sectionRefs[index]}>
        {point}
      </li>
    );
  });

  return (
    <NavContext.Provider value={navState}>
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
      </Wrapper>
    </NavContext.Provider>
  );
};

export default Home;
export { NavContext };
