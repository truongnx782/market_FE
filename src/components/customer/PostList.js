import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Menu, Button, Input, Pagination, Card, Row, Col, message, Modal, Carousel } from 'antd';
import { HomeOutlined, TagOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import ApiPostService from '../../Service/ApiPostService';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

function TableComponent() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const categoryId = +useParams().categoryId;

    useEffect(() => {
        fetchData();
    }, [page, pageSize, search]);

    const fetchData = async () => {
        try {
            const response = await ApiPostService.searchPostList(page - 1, pageSize, search, categoryId);
            setProducts(response.content);
            setTotal(response.totalElements);

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

    return (
        <Layout>
            <HeaderComponent navItems={navItems} search={search} setSearch={setSearch} />
            <Content>
                <FeaturedItems items={products} page={page} pageSize={pageSize} total={total} setPage={setPage} setPageSize={setPageSize} />
            </Content>
            <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
                onChange={(page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                }}
            />
            <FooterComponent />
        </Layout>
    );
}

// Header Component
const HeaderComponent = ({ navItems, search, setSearch }) => (
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
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchForm search={search} setSearch={setSearch} />
                    <PostButton />
                </div>
            </Menu>
        </div>
    </Header>
);

// SearchForm Component
const SearchForm = ({ search, setSearch }) => (
    <div>
        <Input
            placeholder="Tìm kiếm..."
            style={{ width: 200, marginLeft: 20 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
);

// PostButton Component
const PostButton = () => (
    <a href="http://localhost:3000/login" className="text-decoration-none">
        <Button type="primary" danger>Đăng Tin</Button>
    </a>
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
                                        {item.createdAt}
                                    </span>
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
                                <div key={index}>
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

// Footer Component
const FooterComponent = () => (

    <Footer style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Chợ Việt. All rights reserved.</p>
    </Footer>
);

export default TableComponent;
