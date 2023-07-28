import OffcanvasNavbar from "@/app/components/NavbarComponent";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import useOrientation from "@/app/components/utils/hooks/useOrientation";

const HomePage: React.FC = () => {
  const orientation = useOrientation()
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const slogan = "THINK IT. MAKE IT. MEME IT.";
  const status =
    "This Site Is Currently Under Construction!! But There Is A Basic Meme Creator Available...";

  useEffect(() => {
    setIsLandscape(orientation);
  }, [orientation])
 

  return (
    <Container
      fluid
      style={{ background: "black", height: "100vh", color: "white" }}
    >
      <Row>
        <OffcanvasNavbar />
      </Row>
      <Row style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            background: "black",
            top: "0",
            opacity: "0.65",
          }}
        ></div>
        <Col
          style={{
            backgroundImage: "url('/images/landingPage.jpeg')",
            height: "100vh",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLandscape ? (
            <>
              <Image
                src="/images/vaultIconnb.png"
                alt="logo"
                width={200}
                height={100}
                style={{ zIndex: "2" }}
              />
              <h1 style={{ zIndex: "2" }}>{slogan}</h1>
              <span style={{ zIndex: "2", width: "45vw", textAlign: "center", fontSize: "0.9em" }}>
                {" "}
                {status}
              </span>
              <Link
                style={{
                  textDecoration: "none",
                  zIndex: "2",
                  color: "white",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  padding: "0.1em",
                }}
                href="/meme_page"
              >
                Start Memeing
              </Link>
            </>
          ) : (
            <>
              <Image
                src="/images/vaultIconnb.png"
                alt="logo"
                width={100}
                height={100}
                style={{ zIndex: "2" }}
              />
              <h4 style={{ zIndex: "2" }}>{slogan}</h4>
              <span style={{ zIndex: "2", fontSize: "0.6em", width: "57vw" , textAlign: "center"}}>
                {" "}
                {status}
              </span>
              <Link
                style={{
                  textDecoration: "none",
                  zIndex: "2",
                  color: "white",
                  border: "3px solid yellow",
                  borderRadius: "10px",
                  padding: "0.1em",
                }}
                href="/meme_page"
              >
                Start Memeing
              </Link>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
