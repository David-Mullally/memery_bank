import Container from "react-bootstrap/Container";
import OffcanvasExample from "@/app/components/NavbarComponent";
import Link from "next/link";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <Container
      fluid
      style={{
        background: "#000",
        padding: " 0",
        backgroundImage: "url('/images/landingPage.jpeg')",
        height: "100vh",
        backgroundSize: "cover",
        position: "relative",
        opacity: "0.8",
        overflow: "hidden",
      }}
    >
      <OffcanvasExample />
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          background: "black",
          height: "100vh",
          width: "100vw",
          top: "0",
          opacity: "0.7",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "auto",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "2",
            color: "white",
            textAlign: "center",
          }}
        >
          <Image src="/images/vaultIconnb.png" alt="MemeryBank Logo" width={300} height={300} />
          <h1 style={{ fontSize: "3em" }}>THINK IT. MAKE IT. MEME IT.</h1>
          <br />
          <br />
          <h3>
            This site is currently under construction.<br/>But you can still make
            some memes. Click the link below.
          </h3>
          <Link href="/memePage" legacyBehavior><a className="nav-link" style={ {fontSize: "1.5em", border: "1px solid yellow"}}>Get Memeing...</a></Link> 
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
