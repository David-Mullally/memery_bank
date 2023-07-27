import { FC, useState, useEffect } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import { useMemeLayout } from "../stores/memeLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FontFamilyComponent from "./fontFamilyComponent";
import useOrientation from "./utils/hooks/useOrientation";

interface EditImageComponentProps {
  memePanelNum: number;
}

const EditImageComponent: FC<EditImageComponentProps> = ({ memePanelNum }) => {
  // Taken from store
  const editImageProperties = useEditImageProperties();
  const memeLayout = useMemeLayout();
  const memeLayoutProperties = memeLayout.memeLayoutProperties;
  //read values
  const textColor = editImageProperties.editImageProperties.textColor;
  const textOutlineColor =
    editImageProperties.editImageProperties.textOutlineColor;
  const setResizableDivVisible =
    useEditImageProperties().setResizableDivVisible;
  const isDisabled = editImageProperties.editImageProperties.isDisabled;
  const imageResize1 = memeLayoutProperties.firstPanelResize;
  const imageResize2 = memeLayoutProperties.secondPanelResize;
  const imageResize3 = memeLayoutProperties.thirdPanelResize;
  const imageTopText = editImageProperties.editImageProperties.imageTopText;
  const image2TopText = editImageProperties.editImageProperties.image2TopText;
  const image3TopText = editImageProperties.editImageProperties.image3TopText;
  const imageBottomText =
    editImageProperties.editImageProperties.imageBottomText;
  const image2BottomText =
    editImageProperties.editImageProperties.image2BottomText;
  const image3BottomText =
    editImageProperties.editImageProperties.image3BottomText;
  //set values
  const setTextColor = editImageProperties.setTextColor;
  const setTextOutlineColor = editImageProperties.setTextOutlineColor;
  const setImage2TopText = editImageProperties.setImage2TopText;
  const setImage3TopText = editImageProperties.setImage3TopText;
  const setImage2BottomText = editImageProperties.setImage2BottomText;
  const setImage3BottomText = editImageProperties.setImage3BottomText;
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
  //React hooks
  //useState
  const [uploadInputDisplay, setUploadInputDisplay] = useState<boolean>(false);
  //other variables
  const topTexts = [imageTopText, image2TopText, image3TopText];
  const bottomTexts = [imageBottomText, image2BottomText, image3BottomText];
  const imageResizeVals = [imageResize1, imageResize2, imageResize3];
  const orientation = useOrientation();
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  // functions
  const handleImageResizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageResize = Number(event.currentTarget.value);
    if (memePanelNum === 1) {
      setFirstPanelResize(imageResize);
      console.log(event.currentTarget.value);
    } else if (memePanelNum === 2) {
      setSecondPanelResize(imageResize);
      console.log(event.currentTarget.value);
    } else if ((memePanelNum = 3)) {
      setThirdPanelResize(imageResize);
      console.log(event.currentTarget.value);
    }
  };

  const handleUploadInputDisplay = () => {
    setUploadInputDisplay(true);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (memePanelNum === 1) {
        const imageURL = URL.createObjectURL(file);
        setImageURL(imageURL);
      } else if (memePanelNum === 2) {
        const image2URL = URL.createObjectURL(file);
        setImage2URL(image2URL);
      } else if (memePanelNum === 3) {
        const image3URL = URL.createObjectURL(file);
        setImage3URL(image3URL);
      }
    }
    setUploadInputDisplay(false);
  };
  const handleImageTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isTopText: boolean
  ) => {
    const imageText = e.currentTarget.value;
    if (e.currentTarget.value.length < 30) {
      if (isTopText) {
        if (memePanelNum === 1) {
          setImageTopText(imageText);
        } else if (memePanelNum === 2) {
          setImage2TopText(imageText);
        } else if (memePanelNum === 3) {
          setImage3TopText(imageText);
        }
      }
      if (!isTopText) {
        if (memePanelNum === 1) {
          setImageBottomText(imageText);
        } else if (memePanelNum === 2) {
          setImage2BottomText(imageText);
        } else if (memePanelNum === 3) {
          setImage3BottomText(imageText);
        }
      }
    }
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
  };

  useEffect(() => {
    setIsLandscape(orientation);
  }, [orientation]);

  return (
    <>
      {isLandscape ? (
        <Row style={{ height: "100vh", background: "gray" }}>
          <Col xs={12} style={{ background: "white", height: "100vh" }}>
            <Row
              style={{
                textAlign: "center",
                background: "gray",
                height: "10vh",
              }}
            >
              <FontFamilyComponent />
            </Row>
            <Row
              xl={6}
              style={{ height: "61vh", color: "black", background: "gray" }}
            >
              <Col
                xs={4}
                style={{
                  fontSize: "0.8em",
                  display: "flex",
                  background: "gray",
                }}
              >
                %
                <input
                  type="Number"
                  name="imageResize"
                  id="imageResize"
                  value={imageResizeVals[memePanelNum - 1]}
                  onChange={handleImageResizeChange}
                  disabled={isDisabled}
                  style={{ maxWidth: "100%", height: "5vh" }}
                />
              </Col>
              <Col
                xs={4}
                style={{ display: "flex", height: "5vh", alignItems: "center" }}
              >
                Text:
                <input
                  type="color"
                  name="textColor"
                  id="textColor"
                  value={textColor}
                  onChange={(e) => handleImageTextColor(e)}
                  disabled={false}
                  style={{ height: "100%" }}
                />
              </Col>
              <Col
                xs={4}
                style={{ display: "flex", height: "5vh", alignItems: "center" }}
              >
                <input
                  type="color"
                  name="textOutlineColor"
                  id="textOutlineColor"
                  value={textOutlineColor}
                  onChange={(e) => handleImageTextOutlineColor(e)}
                  disabled={false}
                  style={{ height: "100%", width: "50%" }}
                />
              </Col>
              <Row style={{ marginBottom: "2%", display: "flex" }}>
                Top:
                <input
                  type="text"
                  name="imageTopText"
                  id="imageTopText"
                  value={topTexts[memePanelNum - 1]}
                  onChange={(e) => handleImageTextChange(e, true)}
                  disabled={isDisabled}
                  style={{ maxWidth: "85%", height: "10vh" }}
                />
              </Row>
              <Row style={{ display: "flex" }}>
                Bottom:
                <input
                  type="text"
                  name="imageBottomText"
                  id="imageBottomText"
                  value={bottomTexts[memePanelNum - 1]}
                  onChange={(e) => handleImageTextChange(e, false)}
                  disabled={isDisabled}
                  style={{ maxWidth: "71%", height: "10vh" }}
                />
              </Row>
            </Row>
            <Row style={{ height: "14vh", background: "red" }}>
              <Col
                xs={6}
                style={{
                  background: "blue",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleUploadInputDisplay}
              >
                {uploadInputDisplay ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "5vh",
                      width: "100%",
                      margin: "0",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleUploadInputDisplay}
                  >
                    UPLOAD
                  </div>
                )}
              </Col>
              <Col
                xs={6}
                style={{
                  background: "red",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleUploadInputDisplay}
              >
                  <div
                    style={{
                      height: "5vh",
                      width: "100%",
                      margin: "0",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleClearMeme}
                  >
                    Clear
                  </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <>
          {" "}
          <Row style={{ background: "orange" }}>
            <Col
              style={{
                background: "blue",
                height: "5vh",
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {uploadInputDisplay ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: "100%" }}
                />
              ) : (
                <div
                  style={{
                    height: "5.5vh",
                    width: "100%",
                    margin: "0",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleUploadInputDisplay}
                >
                  UPLOAD
                </div>
              )}
            </Col>
            <Col
              style={{
                height: "5vh",
                width: "%",
                background: "red",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "5vh",
                  width: "100%",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleClearMeme}
              >
                CLEAR
              </div>
            </Col>
          </Row>
          <Row style={{ textAlign: "center", background: "gray" }}>
            <FontFamilyComponent />
          </Row>
          <Row
            xl={6}
            style={{
              height: "22vh",
              color: "black",
              padding: "3vw",
              background: "gray",
            }}
          >
            <Col xs={4} style={{ marginBottom: "2%", fontSize: "0.8em" }}>
              %
              <input
                type="Number"
                name="imageResize"
                id="imageResize"
                value={imageResizeVals[memePanelNum - 1]}
                onChange={handleImageResizeChange}
                disabled={isDisabled}
                style={{ maxWidth: "calc(100% - 3em)" }}
              />
            </Col>
            <Col xs={4} style={{ display: "flex" }}>
              Text:
              <input
                type="color"
                name="textColor"
                id="textColor"
                value={textColor}
                onChange={(e) => handleImageTextColor(e)}
                disabled={false}
              />
            </Col>
            <Col xs={4} style={{ display: "flex" }}>
              <input
                type="color"
                name="textOutlineColor"
                id="textOutlineColor"
                value={textOutlineColor}
                onChange={(e) => handleImageTextOutlineColor(e)}
                disabled={false}
              />
            </Col>
            <Row style={{ marginBottom: "2%" }}>
              Top Text:
              <input
                type="text"
                name="imageTopText"
                id="imageTopText"
                value={topTexts[memePanelNum - 1]}
                onChange={(e) => handleImageTextChange(e, true)}
                disabled={isDisabled}
                style={{ maxWidth: "calc(100% - 4.5em)", height: "4vh" }}
              />
            </Row>
            <Row>
              Bottom:
              <input
                type="text"
                name="imageBottomText"
                id="imageBottomText"
                value={bottomTexts[memePanelNum - 1]}
                onChange={(e) => handleImageTextChange(e, false)}
                disabled={isDisabled}
                style={{ maxWidth: "calc(100% - 4.5em)", height: "4vh" }}
              />
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default EditImageComponent;
