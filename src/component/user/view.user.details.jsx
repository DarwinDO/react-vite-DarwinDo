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
                width={'40vw'}
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
                        <br />
                        <p>Avatar:</p>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`} alt="user-avatar"
                            width={150} height={150} />

                        <div>
                            <label htmlFor="btnAvatar"

                                style={{
                                    display: 'inline-block',
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '20px'
                                }}
                            >

                                Upload avatar </label>
                            <input type="file" hidden id='btnAvatar' />
                        </div>
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