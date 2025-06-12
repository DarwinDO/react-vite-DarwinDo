import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, notification, Popconfirm, Space, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetails from './view.user.details';
import { deleteUserAPI } from '../../service/api.service';


const UserTable = (props) => {

    const { dataUser, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize } = props

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)

    const [isDataOpen, setIsDataOpen] = useState(false);
    const [dataView, setDataView] = useState(null);

    const confirm = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: 'Delete User',
                description: 'User deleted successfully'
            });
            if (dataUser.length === 1 && current > 1) {
                setCurrent(current - 1)
            }
            else {
                await loadUser(); // Reload user data after deletion
            }

        } else {
            notification.error({
                message: 'Delete User',
                description: JSON.stringify(res.message)
            });
        }
    };
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
                            setIsDataOpen(true)
                            setDataView(record);
                        }}>{record._id}</a>
                </Space>
            ),
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="large">
                    <a href="#" style={{ color: 'black' }}>
                        <EditOutlined
                            onClick={() => {
                                setIsUpdateModalOpen(true)
                                setDataUpdate(record);
                            }} />
                    </a>
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user?"
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


    // console.log("check dataUser ", dataUpdate);
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
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
            <UpdateUserModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetails
                isDataOpen={isDataOpen}
                setIsDataOpen={setIsDataOpen}
                dataView={dataView}
                setDataView={setDataView}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;