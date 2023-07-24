import { FC, useRef } from "react";
import MemePanelComponent from "./memePanelComponent";
import { useMemeLayout } from "@/app/stores/memeLayout";
import MemeButtonsComponent from "../inputComponents/memeButtonsComponent";
import EditImageComponent from "../EditImageComponent";
import ButtonComponent from "../inputComponents/button";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";

interface MemeComponentProps {}

const MemeComponent: FC<MemeComponentProps> = () => {
  const memeLayout = useMemeLayout().memeLayoutProperties;
  const editImageProperties = useEditImageProperties().editImageProperties;
  const memePanelNum = memeLayout.memePanelNum;
  const divRef = useRef<HTMLDivElement>(null);
  const setMemePanelNum = useMemeLayout().setMemePanelNum;
  const resizableDivVisible = editImageProperties.resizableDivVisible;
  const setResizableDivVisible = useEditImageProperties().setResizableDivVisible;

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
    }, 2000)
    setTimeout(() => {
   setResizableDivVisible(true); 
    }, 4000);
  };

  const handleMemePanelNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemePanelNum(Number(e.currentTarget.value))
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
      <div className="flex text-white">
        Number Of Panels
        <input className="text-black" type="Number" max={3} min={1} name="memePanelNum" id="memePanelNum" value={memePanelNum} onChange={handleMemePanelNumChange} />
        </div>
    <div className="flex">
      <div className="flex flex-col">
        <div ref={divRef} style={{ width: "600px", position:"relative" }}>
          {panelArray.map((panel) => {
            return panel;
          })}
            <div style={{ position: "absolute", bottom: "20px", right: "0", opacity: "0.9", background: "gray", paddingBottom: "10px"}}>Made with MemeryBank</div>
        </div>
        <ButtonComponent
          buttonType="DOWNLOAD"
          onClick={handleImageDownload}
          disabled={false}
        />
      </div>
      <div className="flex flex-col">
        {editArray.map((panel, i) => {
          return (
            <div
              key={i}
              className={`h-[300px] ${resizableDivVisible ? "border-black border-solid" : ""}`}
            >
              <MemeButtonsComponent
                downloadDisabled={false}
                memePanelNum={i + 1}
              />
              {panel}
            </div>
          );
        })}
      </div>
      </div>
      </>
  );
};

export default MemeComponent;
