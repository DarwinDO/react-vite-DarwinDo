import { React, useState } from 'react';
import { Drawer } from 'antd';

const ViewUserDetails = (props) => {



    const { isDataOpen, setIsDataOpen, dataView, setDataView } = props;

    const handleClose = () => {
        setIsDataOpen(false);
        setDataView(null); // Reset dataView to null after closing the drawer
    }
    console.log("check dataView ", dataView);
    return (
        <>
            <Drawer
                title="User Details"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => { handleClose() }}
                open={isDataOpen}
            >
                {dataView
                    ?
                    <>
                        <p>ID: {dataView._id}</p>
                        <br />
                        <p>Full Name: {dataView.fullName}</p>
                        <br />
                        <p>Email: {dataView.email}</p>
                        <br />
                        <p>Phone: {dataView.phone}</p>
                    </>
                    :
                    // console.log("No user data")
                    <p>No user data.</p>
                }
            </Drawer>
        </>
    )
}

export default ViewUserDetails;