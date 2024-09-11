import React, { useState, useEffect } from 'react';
import ApiService from '../../Service/ApiPostService';
import ApiCategoryService from '../../Service/ApiCategoryService';
import ApiImageService from '../../Service/ApiImageSercice';
import SidebarMenu from './SidebarMenu';
import { Table, Button, Input, Modal, Select, Pagination, message, Upload, Dropdown, Form, InputNumber, Space, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, RetweetOutlined, UploadOutlined, DownloadOutlined, DownCircleFilled, ExportOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function TableComponent() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [statusPost, setStatusPost] = useState(null);
    const [total, setTotal] = useState(0);
    const [categorys, setCategorys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { Option } = Select;
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList }) => setFileList(fileList);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    useEffect(() => {
        fetchCategory();
        fetchData();
    }, [page, pageSize, search, statusPost]);

    const fetchData = async () => {
        try {
            const response = await ApiService.search(page - 1, pageSize, search, statusPost);
            setData(response.content);
            setTotal(response.totalElements);
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await ApiCategoryService.getAll();
            setCategorys(response);
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const edit = async (id) => {
        try {
            const result = await ApiService.getById(id);
            const Images = await ApiImageService.getAllByPostId(id);
            setFileList(Images);
            form.setFieldsValue(result);
            setModalVisible(true);
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const exportData = async () => {
        try {
            const blob = await ApiService.exportData(page - 1, pageSize, search, statusPost);
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: 'template.xlsx',
                types: [{ description: 'Excel Files', accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] } }]
            });
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            message.success('Tải về thành công.');
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };



    const onHide = () => {
        setModalVisible(false);
    };

    const handleStatusChange = async (id, checked) => {
        try {
            await ApiService.updatePostStatus(id, checked ? 1 : 0);
            message.success('Cập nhật trạng thái thành công!');
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const confimStatusChange = (id, checked) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn chuyển trạng thái?',
            okText: 'Xác nhận',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: () => handleStatusChange(id, checked),
        });
    };

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'postCode',
            key: 'postCode',
            sorter: (a, b) => a.postCode.localeCompare(b.postCode),
            width: '10%',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            width: '15%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description - b.description,
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Giá',
            key: 'price',
            render: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price),
            sorter: (a, b) => a.price - b.price,
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'location',
            key: 'location',
            sorter: (a, b) => a.location.localeCompare(b.location),
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (value) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => edit(value.id)}
                        style={{ marginRight: 10 }}
                    />
                    <Switch
                        checked={value.statusPost === 1}
                        onChange={(checked) => confimStatusChange(value.id, checked)}
                        checkedChildren="Đã duyệt"
                        unCheckedChildren="Chưa duyệt"
                    />
                </Space>
            ),
            width: '20%',
        },
    ];


    const items = [
        {
            key: '2',
            label: (
                <Button icon={<ExportOutlined />} onClick={exportData}>
                    Export
                </Button>
            ),
        }
    ];



    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '15%' }}>
                <SidebarMenu />
            </div>
            <div style={{ marginLeft: '15%', width: '85%', padding: '16px' }}>
                <div className="card shadow-sm card-body p-2 mb-3 mt-2" style={{ height: '7vh', width: '100%', display: 'flex' }}>
                    <div>
                        <p style={{ display: 'inline-block', margin: 0 }}>Quản lý danh mục/ </p>
                        <h6 style={{ display: 'inline-block', margin: 1 }}> Danh sách bài đăng</h6>
                    </div>
                </div>
                <div className="card shadow-sm card-body ">
                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Input
                                placeholder="Tìm kiếm..."
                                style={{ width: 200, marginLeft: 20 }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Select
                                placeholder="Chọn trạng thái"
                                style={{ width: 200, marginLeft: 20 }}
                                value={statusPost}
                                onChange={setStatusPost}
                            >
                                <Option value={null}>Tất cả</Option>
                                <Option value={1}>Đã duyệt</Option>
                                <Option value={0}>Không duyệt</Option>
                            </Select>
                        </div>

                        <Dropdown
                            menu={{ items }}
                            placement="bottom"
                            arrow>
                            <DownCircleFilled style={{ fontSize: '30px', color: 'blue' }} />
                        </Dropdown>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={false}
                        scroll={{ y: `calc(100vh - 35vh)` }}
                        className='table responsive'
                    />
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

                    <Modal
                        title={'Thông tin bài đăng'}
                        open={modalVisible}
                        onCancel={onHide}
                        width="70vw"
                    >

                        <Form form={form} layout="vertical">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="title"
                                        label="Tiêu đề"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="categoryId"
                                        label="Danh mục"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Select
                                            name="categoryId"
                                            style={{ width: '100%' }}
                                            disabled
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {categorys
                                                .filter(option => (option.status === 1 || option.id === form.getFieldValue('categoryId')))
                                                .map(category => (
                                                    <Option key={category.id} value={category.id}>
                                                        {category.categoryCode + ' - ' + category.categoryName}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="price"
                                        label="Giá thuê"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <InputNumber disabled
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="location"
                                        label="Địa chỉ"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </div>

                                <div>
                                    <Form.Item
                                        name="description"
                                        label="Mô tả"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input.TextArea disabled />
                                    </Form.Item>
                                </div>


                                <div style={{ marginTop: 10 }}>
                                    <label>Hình ảnh</label>

                                    <Form.Item
                                    >
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            beforeUpload={() => false}
                                            onPreview={(file) => {
                                                setPreviewImage(file.url || URL.createObjectURL(file.originFileObj));
                                                setPreviewVisible(true);
                                            }}
                                            showUploadList={{ showRemoveIcon: false, showPreviewIcon: true }} 
                                        >

                                        </Upload>
                                        <Modal
                                            open={previewVisible}
                                            footer={null}
                                            onCancel={() => setPreviewVisible(false)}
                                        >
                                            <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </Form.Item>

                                    {/* <div className="image-preview mt-2 d-flex">
                                        {fetchedImages.map((imageData) => (
                                            <div key={imageData.id} className="position-relative">
                                                <a href={imageData.url} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={imageData.url}
                                                        alt={`fetched ${imageData.id}`}
                                                        className="image-thumbnail"
                                                        style={{
                                                            width: '110px',
                                                            height: '110px',
                                                            objectFit: 'cover',
                                                            marginRight: '5px',
                                                            border: '2px solid #4CAF50',
                                                            borderRadius: '2px',
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div> */}
                                </div>

                            </div>
                        </Form>


                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default TableComponent;
