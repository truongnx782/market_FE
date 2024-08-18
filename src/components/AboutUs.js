import React from 'react';
import { Container, Row, Col, Button, Nav, Form, Navbar, Carousel, Card } from 'react-bootstrap';
import { HomeOutlined, TagOutlined, InfoCircleOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'antd/dist/reset.css'; // Import Ant Design CSS

// Main App Component
const App = () => (
  <div>
    <Header />
    <HeroSection />
    <Categories categories={categoriesData} />
    <FeaturedItems items={featuredItemsData} />
    <Footer />
  </div>
);

// Header Component
const Header = () => (
  <Navbar bg="light" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand href="#home" className="fw-bold" style={{ color: '#ff6f61' }}>
        Chợ Tốt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {navItems.map(({ href, icon, text }) => (
            <Nav.Link key={href} href={href} className="d-flex align-items-center">
              {icon} <span className="ms-2">{text}</span>
            </Nav.Link>
          ))}
        </Nav>
        <SearchForm />
        <PostButton />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

// SearchForm Component
const SearchForm = () => (
  <Form className="d-flex ms-auto">
    <Form.Control
      type="search"
      placeholder="Tìm kiếm sản phẩm"
      className="me-2"
      aria-label="Search"
    />
    <Button variant="danger" className="d-flex align-items-center">
      <SearchOutlined />
    </Button>
  </Form>
);

// PostButton Component
const PostButton = () => (
  <a href="http://localhost:3000/login" className="text-decoration-none">
    <Button variant="warning" className="ms-3">
      Đăng Tin
    </Button>
  </a>
);

// HeroSection Component
const HeroSection = () => (
  <Carousel className="mb-4">
    {carouselItems.map(({ image, alt, title, description, buttonText }, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={image}
          alt={alt}
        />
        <Carousel.Caption>
          <h3>{title}</h3>
          <p>{description}</p>
          <Button variant="danger">{buttonText}</Button>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

// Categories Component
const Categories = ({ categories }) => (
  <Container className="my-4">
    <Row>
      <Col md={12}>
        <h2 className="text-center mb-4">Danh Mục Sản Phẩm</h2>
      </Col>
    </Row>
    <Row className="g-3">
      {categories.map(({ name, image }) => (
        <Col xs={12} sm={6} md={4} lg={3} key={name} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Img
              variant="top"
              src={image}
              className="img-fluid"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

// FeaturedItems Component
const FeaturedItems = ({ items }) => (
  <Container className="my-4">
    <Row>
      <Col md={12}>
        <h2 className="text-center mb-4">Sản Phẩm Nổi Bật</h2>
      </Col>
    </Row>
    <Row>
      {items.map(({ id, title, description, image, datePosted, location }) => (
        <Col xs={12} sm={6} md={4} lg={2} key={id} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Img
              variant="top"
              src={image}
              className="img-fluid"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted">{datePosted}</span>
                <span className="text-muted">{location}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

// Footer Component
const Footer = () => (
  <footer className="bg-dark text-light text-center py-4">
    <Container>
      <Row>
        <Col>
          <p className="mb-0">&copy; 2024 Chợ Tốt. Tất cả quyền được bảo lưu.</p>
          <p className="mb-0">
            <a href="#privacy-policy" className="text-light text-decoration-none">Chính sách bảo mật</a> |
            <a href="#terms-of-service" className="text-light text-decoration-none">Điều khoản sử dụng</a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

// Sample data for categories
const categoriesData = [
  { name: 'Nhà Đất', image: 'https://via.placeholder.com/300?text=Nhà+Đất' },
  { name: 'Xe Cộ', image: 'https://via.placeholder.com/300?text=Xe+Cộ' },
  { name: 'Điện Thoại', image: 'https://via.placeholder.com/300?text=Điện+Thoại' },
  { name: 'Điện Máy', image: 'https://via.placeholder.com/300?text=Điện+Máy' },
  { name: 'Thời Trang', image: 'https://via.placeholder.com/300?text=Thời+Trang' },
  { name: 'Sách', image: 'https://via.placeholder.com/300?text=Sách' },
];

// Sample data for featured items
const featuredItemsData = [
  { id: 1, title: 'Sản phẩm 1', description: 'Mô tả ngắn về sản phẩm 1', image: 'https://via.placeholder.com/250?text=Sản+phẩm+1', datePosted: '01/01/2024', location: 'Hà Nội' },
  { id: 2, title: 'Sản phẩm 2', description: 'Mô tả ngắn về sản phẩm 2', image: 'https://via.placeholder.com/250?text=Sản+phẩm+2', datePosted: '02/01/2024', location: 'Hồ Chí Minh' },
  { id: 3, title: 'Sản phẩm 3', description: 'Mô tả ngắn về sản phẩm 3', image: 'https://via.placeholder.com/250?text=Sản+phẩm+3', datePosted: '03/01/2024', location: 'Đà Nẵng' },
  { id: 4, title: 'Sản phẩm 4', description: 'Mô tả ngắn về sản phẩm 4', image: 'https://via.placeholder.com/250?text=Sản+phẩm+4', datePosted: '04/01/2024', location: 'Nha Trang' },
  { id: 5, title: 'Sản phẩm 5', description: 'Mô tả ngắn về sản phẩm 5', image: 'https://via.placeholder.com/250?text=Sản+phẩm+5', datePosted: '05/01/2024', location: 'Cần Thơ' },
  { id: 6, title: 'Sản phẩm 6', description: 'Mô tả ngắn về sản phẩm 6', image: 'https://via.placeholder.com/250?text=Sản+phẩm+6', datePosted: '06/01/2024', location: 'Vũng Tàu' },
];

// Navigation items for header
const navItems = [
  { href: '#home', icon: <HomeOutlined />, text: 'Trang Chủ' },
  { href: '#categories', icon: <TagOutlined />, text: 'Danh Mục' },
  { href: '#about', icon: <InfoCircleOutlined />, text: 'Giới Thiệu' },
  { href: '#contact', icon: <PhoneOutlined />, text: 'Liên Hệ' },
];

// Carousel items
const carouselItems = [
  { image: 'https://via.placeholder.com/1200x300?text=Khuyến+Mãi+Đặc+Biệt', alt: 'Khuyến Mãi Đặc Biệt', title: 'Khuyến Mãi Đặc Biệt', description: 'Những ưu đãi hấp dẫn chỉ có tại Chợ Tốt.', buttonText: 'Xem Ngay' },
  { image: 'https://via.placeholder.com/1200x300?text=Sản+Phẩm+Mới', alt: 'Sản Phẩm Mới', title: 'Sản Phẩm Mới', description: 'Khám phá các sản phẩm mới nhất trên nền tảng của chúng tôi.', buttonText: 'Khám Phá' },
  { image: 'https://via.placeholder.com/1200x300?text=Giao+Hàng+Miễn+Phí', alt: 'Giao Hàng Miễn Phí', title: 'Giao Hàng Miễn Phí', description: 'Nhận hàng tại nhà với dịch vụ giao hàng miễn phí.', buttonText: 'Tìm Hiểu Thêm' },
];

export default App;
