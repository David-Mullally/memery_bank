import { FC, useState } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import { useMemeLayout } from "../stores/memeLayout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface EditImageComponentProps {
  memePanelNum: number;
}

const EditImageComponent: FC<EditImageComponentProps> = ({ memePanelNum }) => {
  console.log("EditImageComponent Rendering");
  // Taken from store
  const editImageProperties = useEditImageProperties();
  const memeLayout = useMemeLayout();
  const memeLayoutProperties = memeLayout.memeLayoutProperties;
  //read values
  const textColor = editImageProperties.editImageProperties.textColor;
  const textOutlineColor =
    editImageProperties.editImageProperties.textOutlineColor;
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
  const setImageTopText = editImageProperties.setImageTopText;
  const setImage2TopText = editImageProperties.setImage2TopText;
  const setImage3TopText = editImageProperties.setImage3TopText;
  const setImageBottomText = editImageProperties.setImageBottomText;
  const setImage2BottomText = editImageProperties.setImage2BottomText;
  const setImage3BottomText = editImageProperties.setImage3BottomText;
  const setFirstPanelResize = memeLayout.setFirstPanelResize;
  const setSecondPanelResize = memeLayout.setSecondPanelResize;
  const setThirdPanelResize = memeLayout.setThirdPanelResize;
  //React hooks
  //useState
  const [uploadInputDisplay, setUploadInputDisplay] = useState<boolean>(false);
  //other variables
  const topTexts = [imageTopText, image2TopText, image3TopText];
  const bottomTexts = [imageBottomText, image2BottomText, image3BottomText];
  const imageResizeVals = [imageResize1, imageResize2, imageResize3];
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

  const setImageURL = useMemeLayout().setImageURL;
  const setImage2URL = useMemeLayout().setImage2URL;
  const setImage3URL = useMemeLayout().setImage3URL;

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

  return (
    <>
      <Row xl={12} style={{ background: "blue"}}>
        {uploadInputDisplay ? (
          <Row xl={12}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Row>
        ) : (
            <Button style={{height:"4.2vh"}} variant="primary" onClick={handleUploadInputDisplay}>
            UPLOAD
          </Button>
        )}
      </Row>
      <Row xl={6} style={{ height: "22vh" }}>
        <Col xl={12} style={{textAlign: "center", color: "#fff",display: "flex", flexDirection: "column" , background: "#000"}}>
          <div>
            <div style={{ marginBottom: "2%" }}>
              resize(%)
            <input
              type="Number"
              name="imageResize"
              id="imageResize"
              value={imageResizeVals[memePanelNum - 1]}
              onChange={handleImageResizeChange}
                disabled={isDisabled}
              style={{maxWidth: "calc(100% - 1em)"}}
              />
              </div>
            <div style={{ marginBottom: "2%" }}>
              top text
              <input
                type="text"
                name="imageTopText"
                id="imageTopText"
                value={topTexts[memePanelNum - 1]}
                onChange={(e) => handleImageTextChange(e, true)}
                disabled={isDisabled}
                style={{maxWidth: "calc(100% - 1em)"}}
              />
            </div>
            <div >
              bottom text
              <input
                type="text"
                name="imageBottomText"
                id="imageBottomText"
                value={bottomTexts[memePanelNum - 1]}
                onChange={(e) => handleImageTextChange(e, false)}
                disabled={isDisabled}
                className="w-[100%]"
                style={{maxWidth: "calc(100% - 1em)"}}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditImageComponent;

