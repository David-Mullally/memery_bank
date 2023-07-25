import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffcanvasExample from '@/app/components/NavbarComponent';

const HomePage: React.FC = () => {
  return (
    <Container fluid style={{background: "#000", padding: " 0"}}>
      <OffcanvasExample />
    </Container>
  );
}

export default HomePage;