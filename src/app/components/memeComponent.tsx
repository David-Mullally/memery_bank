import { FC, useRef } from "react";
import MemePanelComponent from "./memePanelComponent";
import { useMemeLayout } from "@/app/stores/memeLayout";
import EditImageComponent from "./EditImageComponent";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "../stores/EditImageProperties";
import OffcanvasNavbar from "./NavbarComponent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import useOrientation from "./utils/hooks/useOrientation";

interface MemeComponentProps {}

const MemeComponent: FC<MemeComponentProps> = () => {
  const memeLayout = useMemeLayout().memeLayoutProperties;
  const editImageProperties = useEditImageProperties().editImageProperties;
  const memePanelNum = memeLayout.memePanelNum;
  const divRef = useRef<HTMLDivElement>(null);
  const setMemePanelNum = useMemeLayout().setMemePanelNum;
  const resizableDivVisible = editImageProperties.resizableDivVisible;
  const setResizableDivVisible =
    useEditImageProperties().setResizableDivVisible;
  const textColor = editImageProperties.textColor;
  const textOutlineColor = editImageProperties.textOutlineColor;
  const setTextColor = useEditImageProperties().setTextColor;
  const setTextOutlineColor = useEditImageProperties().setTextOutlineColor;
  const orientation = useOrientation();
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  useEffect(() => {
    setIsLandscape(orientation);
  }, [orientation]);

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

  function createArrayWithLength(length: number): any[] {
    const panelArray: any[] = [];

    for (let i = 0; i < length; i++) {
      panelArray.push(<MemePanelComponent memePanelNum={i + 1} key={i} />);
    }
    return panelArray;
  }

  function createArray2WithLength(length: number): any[] {
    const editArray: any[] = [];

    for (let i = 0; i < length; i++) {
      editArray.push(<EditImageComponent memePanelNum={i + 1} key={i} />);
    }
    return editArray;
  }

  const panelArray = createArrayWithLength(1);
  const editArray = createArray2WithLength(1);
  return (
    <>
      {isLandscape ? (
     <MemePanelComponent memePanelNum={1} />
      ) : (
     <MemePanelComponent memePanelNum={1} />  
      )}
    </>
  );
};

export default MemeComponent;

{
  /* <Container fluid>
      <Row>
      <Col xs={12} xl={6} style={{ position: "relative", textAlign:"center", color: "white" }}>
        <div ref={divRef} style={{position: "relative", marginBottom: "0"}}>
          {panelArray.map((panel) => {
            return panel;
          })}
          <div style={{opacity: "0.6", position: "absolute", bottom: "0", right:"0", background: "gray",  textAlign: "center", width: "30%", fontSize: "0.5em"}}>#MemeryBank</div>
        </div>
        <Row style={{ height: "5vh" }}>
          <div style={{background:"green", width:"100%"}} onClick={handleImageDownload} >
            DOWNLOAD
        </div>
        </Row>
      </Col>
      <Col
        xs={12}
        xl={6}
        style={{ position: "relative", height: "100vh" }}
        >
        <div>
          {editArray.map((panel, i) => {
            return (
              <Row key={i} style={{ height: "31.5vh"}}>
                <div
                  key={i}
                  className={` ${
                    resizableDivVisible ? "border-black border-solid" : ""
                  }`}
                >
                  {panel}
                </div>
              </Row>
            );
          })}
        </div>
        </Col>
        </Row>
        </Container> */
}
