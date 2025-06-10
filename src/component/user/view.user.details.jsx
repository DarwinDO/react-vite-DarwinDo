import { React, useState } from 'react';
import { Drawer } from 'antd';

const ViewUserDetails = (props) => {



    const { isDataOpen, setIsDataOpen, dataView, setDataView } = props;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleClose = () => {
        setIsDataOpen(false);
        setDataView(null); // Reset dataView to null after closing the drawer
    }
    console.log("check dataView ", dataView);

    const handleUploadFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        // option: if !file.type.startsWith('image/') -> alert("Please select an image file.") -> return
        console.log("check file ", file);
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }

    }
    console.log("check selectedFile ", selectedFile);
    console.log("check preview ", preview);
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
                        <div style={{
                            width: '150px',
                            height: '150px',
                            border: '1px solid #ccc',

                        }}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`} alt="user-avatar"
                                style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        </div>


                        <div>
                            <label htmlFor="btnUpload"

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
                            <input type="file" hidden id='btnUpload' onChange={(event) => { handleUploadFile(event) }} />
                        </div>
                        {preview &&
                            <div style={{
                                width: '150px',
                                height: '150px',
                                border: '1px solid #ccc',
                                marginTop: '20px',
                            }}>
                                <img src={preview} alt="user-avatar"
                                    style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                            </div>
                        }
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