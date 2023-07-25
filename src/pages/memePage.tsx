import OffcanvasExample from "@/app/components/NavbarComponent";
import MemeComponent from "@/app/components/memeComponent";
import { Container, Row } from "react-bootstrap";
import { useMemeLayout } from "@/app/stores/memeLayout";
import EditImageComponent from "@/app/components/EditImageComponent";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";

const MemePage: React.FC = () => {
  const memePanelNum = useMemeLayout().memeLayoutProperties.memePanelNum;
  const resizableDivVisible = useEditImageProperties().editImageProperties.resizableDivVisible;
  function createArray2WithLength(length: number): any[] {
    const editArray: any[] = [];

    for (let i = 0; i < length; i++) {
      editArray.push(<EditImageComponent memePanelNum={i + 1} key={i} />);
    }
    return editArray;
  }

  const editArray = createArray2WithLength(memePanelNum);
  return (
    <Container
      fluid
      style={{
        background: "#000",
        height: "100vh",
        width: "100vw",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <OffcanvasExample />
      <Row>
       <MemeComponent />
      </Row>
    </Container>
  );
};

export default MemePage;
