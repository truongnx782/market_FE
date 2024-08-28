import React, { useState, useEffect } from 'react';
import ApiService from '../../Service/ApiPostService';
import ApiCategoryService from '../../Service/ApiCategoryService';
import ApiImageService from '../../Service/ApiImageSercice';
import SidebarMenu from './SidebarMenu';
import { Table, Button, Input, Modal, Select, Pagination, message, Upload, Dropdown, Form, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, RetweetOutlined, UploadOutlined, DownloadOutlined, DownCircleFilled, ExportOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function TableComponent() {
    const [data, setData] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(null);
    const [total, setTotal] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [fetchedImages, setFetchedImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { Option } = Select;
    const [form] = Form.useForm();


    useEffect(() => {
        fetchData();
    }, [page, pageSize, search, status]);

    const fetchData = async () => {
        try {
            const response = await ApiService.searchByUid(page - 1, pageSize, search, status);
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
            setFetchedImages(Images);
            setSelectedImages([]);
            form.setFieldsValue(result);
            setIsNew(false);
            setModalVisible(true);
            fetchCategory();

        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const save = async () => {
        try {
            if (isNew) {
                const values = await form.validateFields().catch(() => null);
                if (!values) {
                    return;
                }
                const createdData = await ApiService.create(values);

                // //create image
                const formData = new FormData();
                formData.append('postId', createdData.id);
                selectedImages.forEach((image) => {
                    formData.append('file', image);
                });
                await ApiImageService.create(formData);

                message.success('Thêm mới thành công!');
            } else {
                const values = await form.validateFields().catch(() => null);
                if (!values) {
                    return;
                }
                const id = form.getFieldValue('id');
                await ApiService.update(id, values);

                //create image
                const formData = new FormData();
                formData.append('postId', id);
                selectedImages.forEach((image) => {
                    formData.append('file', image);
                });

                fetchedImages.forEach((image) => {
                    formData.append('image', image.id)
                })
                await ApiImageService.create(formData);

                message.success('Cập nhật thành công!');
            }
            fetchData();
            setModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const remove = async (id) => {
      try {
        await ApiService.delete(id);
        fetchData();
        message.success('Xoá thành công.');
      } catch (error) {
        console.error('Error:', error);
        message.error(`Lỗi: ${error.message}`);
      }
    };

    const restore = async (id) => {
      try {
        await ApiService.restore(id);
        fetchData();
        message.success('Khôi phục thành công.');
      } catch (error) {
        console.error('Error:', error);
        message.error(`Lỗi: ${error.message}`);
      }
    };

    const handleUpload = async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await ApiService.upload(formData);
            message.success('Tải lên thành công.');
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
        finally {
            fetchData();
        }
    };

    const downloadTemplate = async () => {
        try {
            const blob = await ApiService.downloadTemplate();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'template.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            message.success('Tải về thành công.');
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };

    const exportData = async () => {
        try {
            const blob = await ApiService.exportData(page - 1, pageSize, search, status);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'template.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            message.success('Tải về thành công.');
        } catch (error) {
            console.error('Error:', error);
            message.error(`Lỗi: ${error.message}`);
        }
    };


    const confirmDelete = (id) => {
      Modal.confirm({
        title: 'Xác nhận',
        content: 'Bạn có chắc chắn muốn xoá phòng này?',
        okText: 'Xác nhận',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk: () => remove(id),
      });
    };

    const confirmRestore = (id) => {
      Modal.confirm({
        title: 'Xác nhận',
        content: 'Bạn có chắc chắn muốn khôi phục phòng này?',
        okText: 'Xác nhận',
        okType: 'primary',
        cancelText: 'Huỷ',
        onOk: () => restore(id),
      });
    };

    const confirmSave = () => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn lưu thông tin phòng này?',
            okText: 'Xác nhận',
            okType: 'primary',
            cancelText: 'Huỷ',
            onOk: () => save(),
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const totalImages = fetchedImages.length + selectedImages.length + files.length;

        if (totalImages > 10) {
            alert(`You can only upload up to 10 images. Currently, you have ${fetchedImages.length + selectedImages.length} images and trying to add ${files.length} more.`);
            return;
        }
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleRemoveImagefetched = (imageId) => {
        const updatedImages = fetchedImages.filter(image => image.id !== imageId);
        setFetchedImages(updatedImages);
    };

    const onHide = () => {
        setModalVisible(false);
        setIsNew(false);
        // setErrors({});
    };

    const openNew = () => {
        setSelectedImages([]);
        setFetchedImages([]);
        form.resetFields();
        setModalVisible(true);
        setIsNew(true);
    };


    // const validate = () => {
    //   let isValid = true;
    //   const errors = {};

    //   if (!selectedData?.roomName?.trim()) {
    //     errors.roomName = 'Tên phòng không được để trống.';
    //     isValid = false;
    //   }

    //   if (!selectedData?.area?.trim()) {
    //     errors.area = 'Diện tích không được để trống.';
    //     isValid = false;
    //   }

    //   if (!selectedData?.rentPrice || isNaN(selectedData.rentPrice) || selectedData.rentPrice < 0) {
    //     errors.rentPrice = 'Giá thuê không hợp lệ.';
    //     isValid = false;
    //   }

    //   if (!selectedData?.address?.trim()) {
    //     errors.address = 'Địa chỉ không được để trống.';
    //     isValid = false;
    //   }

    //   setErrors(errors);
    //   return isValid;
    // };

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
            width: '15%',
            ellipsis: true,
        },
        {
            title: 'Giá',
            key: 'price',
            render: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price),
            sorter: (a, b) => a.price - b.price,
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'location',
            key: 'location',
            sorter: (a, b) => a.location.localeCompare(b.location),
            width: '15%',
            ellipsis: true,
        },
        {
            title: 'Trạng thái bài đăng',
            dataIndex: 'statusPost',
            key: 'statusPost',
            sorter: (a, b) => a.statusPost - b.statusPost,
            render: (value) => (
                <span
                    style={{
                        color:
                            value === 0 ? 'orange' :
                                value === 1 ? 'deepskyblue' : 'inherit',
                        backgroundColor:
                            value === 0 ? '#f5f5f5' :
                                value === 1 ? '#e6f7ff' : 'inherit',
                        border:
                            value === 0 ? '1px solid orange' :
                                value === 1 ? '1px solid deepskyblue' : '1px solid gray',
                        borderRadius: '4px',
                        padding: '2px 8px',
                    }}
                >
                    {value === 0 ? 'Từ chối' : value === 1 ? 'Đã duyệt' : 'Chờ duyệt'}
                </span>
            ),
            width: '15%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status - b.status,
            render: (value) => (
                <span
                    style={{
                        color: value === 1 ? 'green' : 'red',
                        backgroundColor: value === 1 ? '#e6ffe6' : '#ffe6e6',
                        border: value === 1 ? '1px solid green' : '1px solid red',
                        borderRadius: '4px',
                        padding: '2px 8px',
                    }}
                >
                    {value === 1 ? 'Hoạt động' : 'Ngưng hoạt động'}
                </span>
            ),
            width: '15%',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (value) => (
                <div>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => edit(value.id)}
                        style={{ marginRight: 10 }}>
                    </Button>

                    {value.status === 0 ? (
                        <Button
                            icon={<RetweetOutlined />}
                            style={{ color: 'blue', borderColor: 'blue' }}
                        onClick={() => confirmRestore(value.id)}  
                        >
                        </Button>
                    ) : (
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => confirmDelete(value.id)}
                            danger >
                        </Button>
                    )}
                </div>
            ),
            width: '10%',
        },
    ];


    const items = [
        {
            key: '1',
            label: (
                <Upload
                    customRequest={handleUpload}
                    showUploadList={false}
                    accept=".xlsx, .xls"
                >
                    <Button icon={<UploadOutlined />} type="primary">
                        Import Excel
                    </Button>
                </Upload>
            ),
        },
        {
            key: '2',
            label: (
                <Button icon={<ExportOutlined />} onClick={exportData}>
                    Export
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button icon={<DownloadOutlined />} onClick={downloadTemplate}>
                    Template
                </Button>
            ),
        },
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
                            <Button
                                type="primary"
                                onClick={openNew}>
                                Đăng bài
                            </Button>
                            <Input
                                placeholder="Tìm kiếm..."
                                style={{ width: 200, marginLeft: 20 }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Select
                                placeholder="Chọn trạng thái"
                                style={{ width: 200, marginLeft: 20 }}
                                value={status}
                                onChange={setStatus}
                            >
                                <Option value={null}>Tất cả</Option>
                                <Option value={1}>Hoạt động</Option>
                                <Option value={0}>Ngưng hoạt động</Option>
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
                        title={isNew ? 'Thêm mới phòng' : 'Chỉnh sửa phòng'}
                        open={modalVisible}
                        onCancel={onHide}
                        width="70vw"
                        footer={[
                            <Button key="back" onClick={onHide}>Hủy</Button>,
                            <Button key="submit" type="primary" onClick={confirmSave}
                            >
                                Lưu
                            </Button>,
                        ]}
                    >


                        <Form form={form} layout="vertical">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="title"
                                        label="Tiêu đề"
                                        rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="categoryId"
                                        label="Danh mục"
                                        rules={[{ required: true, message: 'Danh mục không được để trống' }]}
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Select
                                            name="categoryId"
                                            style={{ width: '100%' }}
                                            showSearch
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
                                        rules={[{ required: true, message: 'Giá thuê không được để trống' }]}
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Item
                                        name="location"
                                        label="Địa chỉ"
                                        rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>

                                <div>
                                    <Form.Item
                                        name="description"
                                        label="Mô tả"
                                        rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                                        style={{ marginBottom: '4px' }}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </div>


                                <div style={{ marginTop: 10 }}>
                                    <label>Hình ảnh</label>
                                    <input
                                        type="file"
                                        id="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control"
                                    />
                                    <div className="image-preview mt-2 d-flex">
                                        {/* Render fetched images */}
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
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute"
                                                    style={{ top: '5px', right: '5px' }}
                                                    onClick={() => handleRemoveImagefetched(imageData.id)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}

                                        {/* Render selected images */}
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className="position-relative">
                                                <a href={URL.createObjectURL(image)} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`preview ${index}`}
                                                        className="image-thumbnail"
                                                        style={{
                                                            width: '110px',
                                                            height: '110px',
                                                            objectFit: 'cover',
                                                            marginRight: '5px',
                                                            border: '2px solid #ffd700',
                                                            borderRadius: '2px',
                                                        }}
                                                    />
                                                </a>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute"
                                                    style={{ top: '5px', right: '5px' }}
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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
