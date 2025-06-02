import { Space, Table, Tag } from 'antd';
import { useState } from 'react';

const UserTable = () => {

    const [dataUser, setDataUser] = useState([
        {
            _id: '1',
            fullName: 'John Brown1',
            email: 'abc@gmail.com'
        },
        {
            _id: '2',
            fullName: 'John Brown2',
            email: 'abc@gmail.com'
        },
        {
            _id: '3',
            fullName: 'John Brown3',
            email: 'abc@gmail.com'
        },


    ]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        }
    ];


    const loadUser = async () => {
        const res = await fetchAllUserAPI();
    }
    loadUser();
    return (
        <Table columns={columns} dataSource={dataUser} />
    )
}

export default UserTable;