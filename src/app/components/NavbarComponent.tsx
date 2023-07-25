import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { useNavbar } from "../stores/navbar";

function OffcanvasExample() {
    const currentPage = useNavbar().navbarProperties.currentPage;
    const setCurrentPage = useNavbar().setCurrentPage;
    const handleCurrentPage = (currentPage: string) => {
        setCurrentPage(currentPage)
    }
  return (
    <>
      {["false"].map((expand) => (
        <Navbar style={{zIndex: "5"}} key={expand} expand={expand} className="bg-body-tertiary mb-3">
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
                  <Link href="/memePage" legacyBehavior>
                    {currentPage === "/memePage" ? (
                      <a
                        onClick={()=>handleCurrentPage("/memePage")}
                        className="nav-link"
                        style={{ borderBottom: "1px solid yellow" }}
                      >
                        Make Memes
                      </a>
                    ) : (
                      <a onClick={()=>handleCurrentPage("/memePage")} className="nav-link">
                        Make Memes
                      </a>
                    )}
                  </Link>
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
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
      </NavDropdown>*/}
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

export default OffcanvasExample;
