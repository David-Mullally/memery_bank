import React, { useState, useEffect } from "react";
import CircularCropComponent from "@/app/components/CircularCropComponent";
import { Container, Row, Col } from "react-bootstrap";
import useOrientation from "@/app/components/utils/hooks/useOrientation";
import OffcanvasNavbar from "@/app/components/NavbarComponent";

const CropToCirclePage: React.FC = () => {
  const orientation = useOrientation();
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  useEffect(() => {
    setIsLandscape(orientation);
  }, [orientation]);
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      >
          <Row>
              <OffcanvasNavbar />
          </Row>
      <Col>
        <Row style={{ textAlign: "center", width: "100vw", marginTop: "4vh" }}>
          {isLandscape ? (
            <h5 style={{ color: "black" }}> Crop Image To Circle</h5>
          ) : (
            <h1 style={{ color: "black" }}>Crop Image To Circle</h1>
          )}
        </Row>
        {isLandscape ? (
          <Row
            style={{
              height: " 67vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              padding: "0 30vw",
            }}
          >
            <CircularCropComponent />
          </Row>
        ) : (
          <Row
            style={{
              height: "50vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularCropComponent />
          </Row>
        )}
      </Col>
    </Container>
  );
};

export default CropToCirclePage;
