import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { useNavbar } from "../stores/navbar";

function OffcanvasNavbar() {
    const currentPage = useNavbar().navbarProperties.currentPage;
    const setCurrentPage = useNavbar().setCurrentPage;
    const handleCurrentPage = (currentPage: string) => {
        setCurrentPage(currentPage)
    }
  return (
    <>
      {["false"].map((expand) => (
        <Navbar style={{zIndex: "2"}} key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid>
          <Link href="/" legacyBehavior passHref>
            <Navbar.Brand href="/">MemeryBank</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MemeryBank
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link href="/" legacyBehavior>
                    {currentPage === "/" ? (
                      <a
                        onClick={()=>handleCurrentPage("/")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        Home
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/")} className="nav-link">
                        Home
                      </a>
                    )}
                  </Link>
                  <Link href="/about" legacyBehavior>
                    {currentPage === "/about" ? (
                      <a
                        onClick={()=>handleCurrentPage("/about")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        About
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/about")} className="nav-link">
                        About
                      </a>
                    )}
                  </Link>
                  <Link href="/meme_page" legacyBehavior>
                    {currentPage === "/meme_page" ? (
                      <a
                        onClick={()=>handleCurrentPage("/meme_page")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        Make Memes
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/meme_page")} className="nav-link">
                        Make Memes
                      </a>
                    )}
                  </Link>
                   <NavDropdown
                    title="Tools"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/tools/crop_to_circle">
                    <Link href="/tools/crop_to_circle" legacyBehavior>
                    {currentPage === "/tools/crop-to-circle" ? (
                      <a
                        onClick={()=>handleCurrentPage("/tools/crop_to_circle")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        Crop To Circle
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/tools/crop-to-circle")} className="nav-link">
                        Crop To Circle
                      </a>
                    )}
                  </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/tools/superimpose">
                      Superimpose (Coming Soon!)
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      ??? (Coming Soon)
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Link href="/contact" legacyBehavior>
                    {currentPage === "/contact" ? (
                      <a
                        onClick={()=>handleCurrentPage("/contact")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        Contact
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/contact")} className="nav-link">
                        Contact
                      </a>
                    )}
                  </Link>
                </Nav>
                {/*<Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
             <Button variant="outline-success">Search</Button>
                </Form>*/}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasNavbar;
