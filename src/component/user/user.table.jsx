import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetails from './view.user.details';


const UserTable = (props) => {

    const { dataUser, loadUser } = props

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)

    const [isDataOpen, setIsDataOpen] = useState(false);
    const [dataView, setDataView] = useState(null);


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
                    <a href="#" style={{ color: "red" }}><DeleteOutlined /></a>
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