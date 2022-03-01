import { NextPage } from "next";
import styled from "styled-components";
import { Container } from "../styles/styled";
import { motion, useAnimation } from "framer-motion";
import Cta from "../components/Cta";
import { useEffect, useState } from "react";
import { useLocale } from "../hooks/useLocale";
import { useSizer } from "../hooks/useSizer";

const Wrapper = styled.div`
  min-width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  main {
    display: flex;

    @media only screen and (max-width: 1200px) {
      position: absolute;
      left: 0;
      ${Container} {
        min-width: 100vw;
        padding: 0;
        margin: 0;
        width: auto !important;
      }
    }
  }
`;

interface MemberProps {
  name: string;
  occupation: string;
  about: string;
  social: string;
  image: string;
}

const MemberWrapper = styled.div`
  height: 100vh;
  flex: 1;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;

  @media only screen and (max-width: 1200px) {
    width: 85vw !important;
    flex: none;
  }

  /* TODO: Implement scale in on hover */
`;

const Fade = styled.div`
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  width: 100%;
  height: 60%;
  position: absolute;
  bottom: 0;
`;

const MemberBackdrop = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #111;
  cursor: auto !important;
`;

const MemberInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: absolute;
  color: #fff;
  z-index: 100;
  padding: 0em 4em;
  cursor: auto !important;

  @media only screen and (max-width: 1200px) {
    margin-top: -2em;
  }

  .primary {
    .occupation {
      font-size: 1.4rem;
      color: #ddd;
      margin-bottom: -0.5em;
    }
  }

  .additional {
    margin-top: -3em;
  }
`;

const MemberSwitch = styled.div`
  position: absolute;
  bottom: 5em;
  margin-left: 4em;
  color: #fff;

  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

// TODO: Make top nav bar slide up when scroll into team view

const Member: React.FC<MemberProps> = ({
  about,
  name,
  occupation,
  social,
  image,
}) => {
  const backdropControls = useAnimation();
  const informationControls = useAnimation();
  const additionalInformationControls = useAnimation();

  const [memberUnwrapped, setMemberUnwrapped] = useState(false);

  useEffect(() => {
    if (memberUnwrapped) {
      informationControls.start({
        top: "5%",
        transition: { delay: 0.1 },
      });

      (async () => {
        await additionalInformationControls.start({
          display: "block",
        });

        await additionalInformationControls.start({
          transition: { delay: 0.5 },
          opacity: 1,
          y: 0,
        });
      })();
    } else {
      (async () => {
        await additionalInformationControls.start({
          opacity: 0,
          y: 20,
        });
        await additionalInformationControls.start({
          display: "none",
        });
      })();

      informationControls.start({
        top: "85%",
      });
    }
  }, [memberUnwrapped]);

  return (
    <MemberWrapper
      onClick={(e) => {
        e.preventDefault();
        if (!memberUnwrapped) {
          setMemberUnwrapped(true);
          backdropControls.start({
            height: "100vh",
            transition: { duration: 0.4 },
          });
        }
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setMemberUnwrapped(false);
        backdropControls.start({
          height: 0,
          transition: { duration: 0.4 },
        });
      }}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <Fade />
      <MemberBackdrop animate={backdropControls} />
      <MemberInfo animate={informationControls}>
        <motion.div className="primary">
          <p className="occupation">{occupation}</p>
          <p className="name">{name}</p>
        </motion.div>
        <motion.div
          className="additional"
          initial={{
            display: "none",
            opacity: 0,
            y: 20,
          }}
          animate={additionalInformationControls}
        >
          <p className="descr">{about}</p>
          <Cta href={social}>Instagram</Cta>
        </motion.div>
      </MemberInfo>
    </MemberWrapper>
  );
};

const Team: NextPage = () => {
  const localized = useLocale();
  const [currentMember, setCurrentMember] = useState(0);
  const sizer = useSizer();
  const mainConrols = useAnimation();

  useEffect(() => {
    let offset = -currentMember * (sizer.w - sizer.w * 0.15);
    if (currentMember + 1 == localized.team.length) {
      offset = offset + sizer.w * 0.15;
    } else if (currentMember == localized.team.length) {
      offset = 0;
    }
    mainConrols.start({
      left: offset,
    });
  }, [currentMember]);

  return (
    <Wrapper>
      <Container>
        <motion.main
          initial={{
            left: 0,
          }}
          animate={mainConrols}
        >
          {localized.team.map((member, index) => {
            return (
              <Member
                key={index}
                about={member.description}
                image={`/team/${member.image}`}
                name={member.name}
                occupation={member.occupation}
                social={member.instagram}
              />
            );
          })}
        </motion.main>
      </Container>
      <MemberSwitch>
        <Cta
          onClick={() => {
            if (currentMember >= localized.team.length - 1) {
              setCurrentMember(0);
            } else {
              setCurrentMember((state) => state + 1);
            }
          }}
        >
          Next
        </Cta>
      </MemberSwitch>
    </Wrapper>
  );
};

export default Team;
