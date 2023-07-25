import { FC, useRef } from "react";
import MemePanelComponent from "./memePanelComponent";
import { useMemeLayout } from "@/app/stores/memeLayout";
import EditImageComponent from "./EditImageComponent";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import FontFamilyComponent from "./fontFamilyComponent";

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
    <>
      <Row xl={12} style={{ background: "black", color: "#fff", height: "4vh", display: "flex" }}>
        <Col>Panels
          <input type="number" name="memePanelNum" id="memePanelNum" min={1} max={3} value={memePanelNum} onChange={handleMemePanelNumChange} /></Col>
        <Col>
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
        <Col>
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
        <Col>
          <FontFamilyComponent />
        </Col>
      </Row>
      <Col xs={8} xl={4} style={{ position: "relative" }}>
        <div ref={divRef}>
          {panelArray.map((panel) => {
            return panel;
          })}
        </div>
        <Row style={{ height: "6vh" }}>
          <Button variant="primary" onClick={handleImageDownload} >
            DOWNLOAD MEME
        </Button>
        </Row>
      </Col>
      <Col
        xs={4}
        xl={4}
        style={{ position: "relative", height: "100vh" }}
      >
        <div>
          {editArray.map((panel, i) => {
            return (
              <Row key={i} style={{ height: "27vh"}}>
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
        <Row style={{ height: "6vh" }}>
          <Button 
            variant="danger"
            onClick={handleClearMeme}
          > CLEAR MEME </Button>
        </Row>
      </Col>
      <Col xl={4} style={{background:"white"}} ></Col>
    </>
  );
};

export default MemeComponent;
