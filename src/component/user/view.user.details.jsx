import { React, useState } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUploadFiles, updateUserAvatarAPI } from '../../service/api.service';
import { json } from 'react-router-dom';

const ViewUserDetails = (props) => {



    const { isDataOpen, setIsDataOpen, dataView, setDataView, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleClose = () => {
        setIsDataOpen(false);
        setDataView(null); // Reset dataView to null after closing the drawer
    }
    // console.log("check dataView ", dataView);


    const handleUploadFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        // option: if !file.type.startsWith('image/') -> alert("Please select an image file.") -> return
        // console.log("check file ", file);
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }

    }

    const handleUploadUserAvatar = async () => {
        const resUpload = await handleUploadFiles(selectedFile, "avatar")
        // console.log("check resUpload", resUpload)
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            // console.log("check newAvatar: ", newAvatar)
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataView._id, dataView.fullName, dataView.phone)
            if (resUpdateAvatar.data) {
                setIsDataOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()
                notification.success({
                    message: "Update user avatar",
                    description: "Updated user avatar successfully"
                })
            }
            else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        }
        else {
            notification.error({
                message: "Error file upload",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    // console.log("check selectedFile ", selectedFile);
    // console.log("check preview ", preview);
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
                            <>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    border: '1px solid #ccc',
                                    marginTop: '20px',
                                    marginBottom: '15px'
                                }}>
                                    <img src={preview} alt="user-avatar"
                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                </div>
                                <Button onClick={() => { handleUploadUserAvatar() }}
                                    type='primary'>Save</Button>
                            </>
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