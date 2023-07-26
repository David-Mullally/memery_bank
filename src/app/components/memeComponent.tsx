import { FC, useRef } from "react";
import MemePanelComponent from "./memePanelComponent";
import { useMemeLayout } from "@/app/stores/memeLayout";
import EditImageComponent from "./EditImageComponent";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "../stores/EditImageProperties";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import FontFamilyComponent from "./fontFamilyComponent";
import Container from "react-bootstrap/Container";

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
  const setImageURL = useMemeLayout().setImageURL;
  const setImage2URL = useMemeLayout().setImage2URL;
  const setImage3URL = useMemeLayout().setImage3URL;
  const setImageTopText = useEditImageProperties().setImageTopText;
  const setImageTop2Text = useEditImageProperties().setImage2TopText;
  const setImageTop3Text = useEditImageProperties().setImage3TopText;
  const setImageBottomText = useEditImageProperties().setImageBottomText;
  const setImageBottom2Text = useEditImageProperties().setImage2BottomText;
  const setImageBottom3Text = useEditImageProperties().setImage3BottomText;
  const setFontFamily = useEditImageProperties().setFontFamily;
  const setFirstPanelResize = useMemeLayout().setFirstPanelResize;
  const setSecondPanelResize = useMemeLayout().setSecondPanelResize;
  const setThirdPanelResize = useMemeLayout().setThirdPanelResize;



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

  const handleMemePanelNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemePanelNum(Number(e.currentTarget.value));
  };

  const handleImageTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTextColor = e.currentTarget.value;
    setTextColor(imageTextColor);
  };

  const handleImageTextOutlineColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageTextColor = e.currentTarget.value;
    setTextOutlineColor(imageTextColor);
  };

  const handleClearMeme = () => {
    setImageURL("");
    setImage2URL("");
    setImage3URL("");
    setImageTopText("");
    setImageTop2Text("");
    setImageTop3Text("");
    setImageBottomText("");
    setImageBottom2Text("");
    setImageBottom3Text("");
    setFontFamily("Arial");
    setTextColor("#000");
    setTextOutlineColor("#000");
    setFirstPanelResize(100);
    setSecondPanelResize(100);
    setThirdPanelResize(100);
  }

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

  const panelArray = createArrayWithLength(memePanelNum);
  const editArray = createArray2WithLength(memePanelNum);
  return (
    <Container fluid style={{background:"black"}}>
      <Row xl={12} style={{ background: "black", color: "#fff", height:"6vh"}}>
        <Col xs={4}>Panels
          <input type="number" name="memePanelNum" id="memePanelNum" min={1} max={3} value={memePanelNum} onChange={handleMemePanelNumChange} /></Col>
        <Col xs={4} style={{display:"flex"}}>
          Text
          <input
            type="color"
            name="textColor"
            id="textColor"
            value={textColor}
            onChange={(e) => handleImageTextColor(e)}
            disabled={false}
          />
        </Col>
        <Col xs={4} style={{display:"flex"}}>
          Outline
          <input
            type="color"
            name="textOutlineColor"
            id="textOutlineColor"
            value={textOutlineColor}
            onChange={(e) => handleImageTextOutlineColor(e)}
            disabled={false}
          />
        </Col>
      </Row>
      <Row xs={12} style ={{background: "black", textAlign:"center"}}>
          <FontFamilyComponent />
      </Row>
      <Row>
      <Col xs={7} xl={4} style={{ position: "relative", textAlign:"center", color: "orange" }}>
        <div ref={divRef} style={{position: "relative", marginBottom: "0"}}>
          {panelArray.map((panel) => {
            return panel;
          })}
          <div style={{opacity: "0.6", position: "absolute", bottom: "0", right:"0", color: "black", background: "gray",  textAlign: "center", width: "30%", fontSize: "0.5em"}}>#MemeryBank</div>
        </div>
        <Row style={{ height: "4vh" }}>
          <Button variant="primary" onClick={handleImageDownload} >
            DOWNLOAD MEME
        </Button>
        </Row>
      </Col>
      <Col
        xs={5}
        xl={4}
        style={{ position: "relative", height: "100vh" }}
        >
        <div>
          {editArray.map((panel, i) => {
            return (
              <Row key={i} style={{ height: "26vh"}}>
                {/*  <MemeButtonsComponent
                downloadDisabled={false}
                memePanelNum={i + 1}
          /> */}
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
        <Row style={{ height: "4vh" }}>
          <Button 
            variant="danger"
            onClick={handleClearMeme}
          > CLEAR MEME </Button>
        </Row>
        </Col>
        </Row>
    </Container>
  );
};

export default MemeComponent;
