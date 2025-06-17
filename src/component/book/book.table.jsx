import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import ViewBookDetails from "./view.book.details";
import BookForm from "./book.form";


const BookTable = (props) => {
    const { loadBook, dataBook, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isDataBookOpen, setIsDataBookOpen] = useState(false);
    const [dataBookDetails, setDataBookDetails] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const cancel = e => {
        console.log(e);
        // message.error('Click on No');
    };

    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return (
                    <>{(current - 1) * pageSize + (index + 1)}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => (
                <Space size="middle">
                    <a href='#'
                        onClick={() => {
                            setIsDataBookOpen(true)
                            setDataBookDetails(record);
                        }}>{record._id}</a>
                </Space>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => {
                // Sử dụng Intl.NumberFormat để định dạng số thành tiền tệ
                // 'vi-VN' là locale cho Việt Nam
                // style: 'currency' để hiển thị dưới dạng tiền tệ
                // currency: 'VND' để chỉ định đơn vị tiền tệ là Việt Nam Đồng
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(price);
            }
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },

        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="large">
                    <a href="#" style={{ color: 'black' }}>
                        <EditOutlined
                            onClick={() => {
                                // setIsUpdateModalOpen(true)
                                // setDataUpdate(record);
                            }} />
                    </a>
                    <Popconfirm
                        title="Delete book"
                        description="Are you sure to delete this book?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        {/* <Button danger><DeleteOutlined /></Button> */}
                        <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {

        console.log("check ", { pagination, filters, sorter, extra })

        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginTop: '10px' }}>
                <h3>Table Book</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create Book
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }}
                onChange={onChange}

            />
            <ViewBookDetails
                isDataBookOpen={isDataBookOpen}
                setIsDataBookOpen={setIsDataBookOpen}
                dataBookDetails={dataBookDetails}
                setDataBookDetails={setDataBookDetails}
            />
            <BookForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookTable;