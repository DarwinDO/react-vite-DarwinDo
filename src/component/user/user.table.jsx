import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, notification, Popconfirm, Space, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetails from './view.user.details';
import { deleteUserAPI } from '../../service/api.service';


const UserTable = (props) => {

    const { dataUser, loadUser } = props

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
            await loadUser(); // Reload user data after deletion
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


    // console.log("check dataUser ", dataUpdate);
    return (
        <>
            <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
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
            />
        </>
    )
}

export default UserTable;