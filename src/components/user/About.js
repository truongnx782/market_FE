import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Form, Input, Carousel, Card, Row, Col, message, Modal } from 'antd';
import { HomeOutlined, TagOutlined, InfoCircleOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import ApiPostService from '../../Service/ApiPostService';
import ApiCategoryService from '../../Service/ApiCategoryService';

import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

function TableComponent() {
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        fetchProduct();
        fetchCategotry();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await ApiPostService.getAll();
            setProducts(response);
        } catch (error) {
            console.log('error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const fetchCategotry = async () => {
        try {
            const response = await ApiCategoryService.getAll();
            setCategorys(response);
        } catch (error) {
            console.log('error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const navItems = [
        { href: 'http://localhost:3000/about', icon: <HomeOutlined />, text: 'Trang Chủ' },
        { href: 'http://localhost:3000/post-list', icon: <TagOutlined />, text: 'Bài đăng' },
        { href: '#about', icon: <InfoCircleOutlined />, text: 'Giới Thiệu' },
        { href: '#contact', icon: <PhoneOutlined />, text: 'Liên Hệ' },
    ];

    const carouselItems = [
        { image: 'https://via.placeholder.com/1200x300?text=Khuyến+Mãi+Đặc+Biệt', alt: 'Khuyến Mãi Đặc Biệt', title: 'Khuyến Mãi Đặc Biệt', description: 'Những ưu đãi hấp dẫn chỉ có tại Chợ Việt.', buttonText: 'Xem Ngay' },
        { image: 'https://via.placeholder.com/1200x300?text=Ưu+Đãi+Mùa+Hè', alt: 'Ưu Đãi Mùa Hè', title: 'Ưu Đãi Mùa Hè', description: 'Giảm giá đến 50% cho các sản phẩm mùa hè.', buttonText: 'Mua Ngay' },
        { image: 'https://via.placeholder.com/1200x300?text=Flash+Sale', alt: 'Flash Sale', title: 'Flash Sale', description: 'Nhanh tay, số lượng có hạn!', buttonText: 'Săn Ngay' },
    ];

    return (
        <Layout>
            <HeaderComponent navItems={navItems} />
            <Content>
                <HeroSection carouselItems={carouselItems} />
                <Categories categories={categorys} />
                <FeaturedItems items={products} />
            </Content>
            <FooterComponent />
        </Layout>
    );
}

// Header Component
const HeaderComponent = ({ navItems }) => (
    <Header className="shadow-sm" style={{ backgroundColor: '#fff' }}>
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo" style={{ color: '#ff6f61', fontWeight: 'bold', fontSize: '24px' }}>Chợ Việt</div>
            <Menu theme="light" mode="horizontal" style={{ flex: 1, display: 'd-flex justify-content-between', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {navItems.map(({ href, icon, text }, index) => (
                        <Menu.Item key={index} icon={icon} style={{ padding: '0 8px' }}>
                            <a href={href}>{text}</a>
                            
                        </Menu.Item>
                    ))}
                      <PostButton />
                </div>
                <div style={{ display: 'flex' }}>
                    {/* <SearchForm /> */}
                    {/* <PostButton /> */}
                </div>
            </Menu>
        </div>
    </Header>
);

// SearchForm Component
// const SearchForm = () => (
//     <Form layout="inline">
//         <Form.Item>
//             <Input placeholder="Tìm kiếm sản phẩm" prefix={<SearchOutlined />} />
//         </Form.Item>
//         <Form.Item>
//             <Button type="primary">Tìm kiếm</Button>
//         </Form.Item>
//     </Form>
// );

// PostButton Component
const PostButton = () => (
    <a href="http://localhost:3000/login" className="text-decoration-none">
        <Button type="primary" danger>Đăng Tin</Button>
    </a>
);

// HeroSection Component
const HeroSection = ({ carouselItems }) => (
    <Carousel autoplay className="mb-4">
        {carouselItems.map(({ image, alt, title, description, buttonText }, index) => (
            <div key={index}>
                <img
                    className="d-block w-100"
                    src={image}
                    alt={alt}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
                <div className="carousel-caption">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <Button type="primary" danger>{buttonText}</Button>
                </div>
            </div>
        ))}
    </Carousel>
);

// Categories Component
const Categories = ({ categories }) => (
    <div className="my-4">
        <Row justify="center">
            <Col span={24}>
                <h2 className="text-center mb-4">Danh Mục Sản Phẩm</h2>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            {categories.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id} style={{ textAlign: 'center' }}>
                    <Card
                        hoverable
                        cover={
                            <div style={{ position: 'relative', paddingTop: '75%' }}>
                                <img
                                    src={item.url}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                        }
                    >
                        <Card.Meta title={item.categoryName} />
                    </Card>
                </Col>
            ))}
        </Row>
    </div>
);

// FeaturedItems Component
const FeaturedItems = ({ items }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <div className="my-4">
            <Row justify="center">
                <Col span={24}>
                    <h2 className="text-center mb-4">Bài đăng mới</h2>
                </Col>
            </Row>
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <Row gutter={[16, 16]} style={{ flexWrap: 'nowrap', margin: 0 }}>
                    {items.map(item => (
                        <Col
                            key={item.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={4}
                            style={{ textAlign: 'center' }}
                            onClick={() => showModal(item)} // Open modal on click
                        >
                            <Card
                                hoverable
                                cover={
                                    <div style={{ position: 'relative', paddingTop: '75%' }}>
                                        <img
                                            alt={item.title}
                                            src={item.imageUrl}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={
                                        <span
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {item.title}
                                        </span>
                                    }
                                    description={
                                        <span
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {item.description}
                                        </span>
                                    }
                                />
                                <div className="d-flex justify-content-between mt-2">
                                    <span
                                        className="text-muted"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: 'block',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {item.location}
                                    </span>
                                    <span className="text-danger">{item.price} VNĐ</span>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal
                title={selectedItem?.title}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedItem && (
                    <div>
                        <img
                            alt={selectedItem.title}
                            src={selectedItem.imageUrl}
                            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
                        />
                        <p><strong>Mô tả: </strong>{selectedItem.description}</p>
                        <p><strong>Địa chỉ: </strong>{selectedItem.location}</p>
                        <p><strong>Giá: </strong>{selectedItem.price} VNĐ</p>
                        <p><strong>Ngày đăng: </strong>{selectedItem.createdAt}</p>
                        <p><strong>Liên hệ: </strong>{selectedItem.phoneNumber}</p>

                    </div>
                )}
            </Modal>
        </div>
    );
};

// FooterComponent
const FooterComponent = () => (
    <Footer style={{ textAlign: 'center' }}>Chợ Việt ©2024 Created by You</Footer>
);

export default TableComponent;
