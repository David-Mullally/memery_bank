import { Container, Col, Row } from "react-bootstrap";
import { useMemeLayout } from "@/app/stores/memeLayout";
import EditImageComponent from "@/app/components/EditImageComponent";
import { useState, useEffect, useRef } from "react";
import useOrientation from "@/app/components/utils/hooks/useOrientation";
import OffcanvasNavbar from "@/app/components/NavbarComponent";
import DraggableElement from "@/app/components/draggableComponent";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import html2canvas from "html2canvas";

const MemePage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const orientation = useOrientation();
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const memePanelNum = useMemeLayout().memeLayoutProperties.memePanelNum;
  const setResizableDivVisible =
    useEditImageProperties().setResizableDivVisible;
  const imageURL = useMemeLayout().memeLayoutProperties.imageURL;

  useEffect(() => {
    setIsLandscape(orientation);
  }, [orientation]);

  function createArray2WithLength(length: number): any[] {
    const editArray: any[] = [];

    for (let i = 0; i < length; i++) {
      editArray.push(<EditImageComponent memePanelNum={i + 1} key={i} />);
    }
    return editArray;
  }

  const handleImageDownload = () => {
    setResizableDivVisible(false);
    setTimeout(() => {
      if (divRef.current) {
        html2canvas(divRef.current).then((canvas) => {
          const imageURL = canvas.toDataURL("image/png");

          // Create a temporary anchor element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = imageURL;
          downloadLink.download = "downloaded_image.png";
          downloadLink.click();
        });
      }
    }, 2000);
    setTimeout(() => {
      setResizableDivVisible(true);
    }, 4000);
  };

  const editArray = createArray2WithLength(memePanelNum);
  return (
    <Container
      fluid
      style={{ background: "#E5E5E5", height: "100vh", color: "white", overflow: "hidden"}}
    >
      <Row>
        <OffcanvasNavbar />
      </Row>
      <Col>
        {isLandscape ? (
          <Row style={{ height: "50vh"}}>
            <Col xs={8} style={{height: "30vh", background: "#E5E5E5" }}>
              <Row style={{ height: "71vh", backgroundImage: `url("${imageURL}")`, backgroundSize: "cover"}}  ref={divRef}>
                {" "}
                <DraggableElement
                  isTopText={true}
                  memePanelNum={1}
                  defaultPosition={{ x: 0, y: 0 }}
                />
                <DraggableElement
                  isTopText={false}
                  memePanelNum={1}
                  defaultPosition={{ x: 0, y: 0 }}
                />
              </Row>
              <Row
                style={{ background: "green", height: "14.7vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={handleImageDownload}
              >
                {" "}
                Download
              </Row>
            </Col>
            <Col xs={4} style={{ background: "teal", height: "100vh" }}>
             <EditImageComponent memePanelNum={1} />
            </Col>
          </Row>
        ) : (
          <>
            <Col style={{  backgroundImage: `url("${imageURL}")`, backgroundSize: "cover", height: "30vh" }} ref={divRef}>
              <DraggableElement
                isTopText={true}
                memePanelNum={1}
                defaultPosition={{ x: 0, y: 0 }}
              />
              <DraggableElement
                isTopText={false}
                memePanelNum={1}
                defaultPosition={{ x: 0, y: 0 }}
              />
            </Col>
            <Row
                style={{ background: "green", height: "5vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={handleImageDownload}
              >
                {" "}
                Download
              </Row>
          <EditImageComponent memePanelNum={1} />
          </>
        )}
      </Col>
    </Container>
  );
};

export default MemePage;
