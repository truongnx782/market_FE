import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Carousel, Card, Row, Col, message, Modal } from 'antd';
import { HomeOutlined, TagOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import ApiPostService from '../../Service/ApiPostService';
import ApiCategoryService from '../../Service/ApiCategoryService';

import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

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

const fetchData = async (fetchFunction, setData, errorMsg) => {
    try {
        const response = await fetchFunction();
        setData(response);
    } catch (error) {
        console.error('error:', error);
        message.error(`${errorMsg}: ${error.message}`);
    }
};

function TableComponent() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData(ApiPostService.getAll, setProducts, 'Lỗi lấy sản phẩm');
        fetchData(ApiCategoryService.getAll, setCategories, 'Lỗi lấy danh mục');
    }, []);

    return (
        <Layout>
            <HeaderComponent />
            <Content>
                <HeroSection />
                <Categories categories={categories} />
                <FeaturedItems items={products} />
            </Content>
            <FooterComponent />
        </Layout>
    );
}

const HeaderComponent = () => (
    <Header className="shadow-sm" style={{ backgroundColor: '#fff' }}>
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo" style={{ color: '#ff6f61', fontWeight: 'bold', fontSize: '24px' }}>Chợ Việt</div>
            <Menu theme="light" mode="horizontal" style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {navItems.map(({ href, icon, text }, index) => (
                        <Menu.Item key={index} icon={icon} style={{ padding: '0 8px' }}>
                            <a href={href}>{text}</a>
                        </Menu.Item>
                    ))}
                    <PostButton />
                </div>
            </Menu>
        </div>
    </Header>
);

const PostButton = () => (
    <a href="http://localhost:3000/login" className="text-decoration-none">
        <Button type="primary" danger>Đăng Tin</Button>
    </a>
);

const HeroSection = () => (
    <Carousel autoplay className="mb-4">
        {carouselItems.map(({ image, alt, title, description, buttonText }, index) => (
            <div key={index}>
                <img className="d-block w-100" src={image} alt={alt} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div className="carousel-caption">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <Button type="primary" danger>{buttonText}</Button>
                </div>
            </div>
        ))}
    </Carousel>
);

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
                    <a href={`http://localhost:3000/post-list/${item.id}`}>
                        <Card
                            hoverable
                            cover={
                                <div style={{ position: 'relative', paddingTop: '75%' }}>
                                    <img
                                        src={item.url}
                                        alt={item.categoryName}
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
                    </a>
                </Col>
            ))}
        </Row>
    </div>
);

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
                            onClick={() => showModal(item)}
                        >
                            <Card
                                hoverable
                                cover={
                                    <div style={{ position: 'relative', paddingTop: '75%' }}>
                                        <img
                                            alt={item.title}
                                            src={item.imageUrls[0]}
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
                                        <span style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: 'block',
                                            maxWidth: '100%',
                                        }}>
                                            {item.title}
                                        </span>
                                    }
                                    description={
                                        <span style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: 'block',
                                            maxWidth: '100%',
                                        }}>
                                            {item.description}
                                        </span>
                                    }
                                />
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="text-muted" style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                        maxWidth: '100%',
                                    }}>
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
                title={
                    <div style={{ textAlign: 'center' }}>
                        {selectedItem?.title}
                    </div>
                } open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width="60vw"
            >
                {selectedItem && (
                    <div>
                           <style>
                            {`
                              .custom-carousel .slick-prev,
                              .custom-carousel .slick-next {
                              color: hotpink !important;
                               }
                           `}
                        </style>
                        <Carousel autoplay dots arrows speed={2000} className="custom-carousel">
                            {selectedItem.imageUrls.map((url, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                }}>
                                    <img
                                        alt={selectedItem.title}
                                        src={url}
                                        style={{
                                            height: '40vh',
                                            objectFit: 'cover',
                                            marginBottom: '20px',
                                            marginLeft: 'auto',  
                                            marginRight: 'auto', 
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
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

const FooterComponent = () => (
    <Footer style={{ textAlign: 'center' }}>
        Chợ Việt ©2024 Created by YourName
    </Footer>
);

export default TableComponent;
