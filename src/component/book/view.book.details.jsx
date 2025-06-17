import { Button, Drawer } from "antd";
import { useState } from "react";
import { handleUploadFiles } from "../../service/api.service";

const ViewBookDetails = (props) => {

    const { isDataBookOpen, setIsDataBookOpen, dataBookDetails, setDataBookDetails } = props;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleClose = () => {
        setIsDataBookOpen(false)
        setDataBookDetails(null)
    }

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

    // const handleUploadBookThumbnail = async () => {
    //     const resUpload = await handleUploadFiles(selectedFile, "book")
    //     // console.log("check resUpload", resUpload)
    //     if (resUpload.data) {
    //         const newBookThumbnail = resUpload.data.fileUploaded;
    //         // console.log("check newAvatar: ", newAvatar)
    //         const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataView._id, dataView.fullName, dataView.phone)
    //         if (resUpdateAvatar.data) {
    //             setIsDataOpen(false)
    //             setSelectedFile(null)
    //             setPreview(null)
    //             await loadUser()
    //             notification.success({
    //                 message: "Update user avatar",
    //                 description: "Updated user avatar successfully"
    //             })
    //         }
    //         else {
    //             notification.error({
    //                 message: "Error upload file",
    //                 description: JSON.stringify(resUpdateAvatar.message)
    //             })
    //         }

    //     }
    //     else {
    //         notification.error({
    //             message: "Error file upload",
    //             description: JSON.stringify(resUpload.message)
    //         })
    //     }
    // }
    // // console.log("check selectedFile ", selectedFile);
    // // console.log("check preview ", preview);

    return (
        <>
            <Drawer
                width={'30vw'}
                title="Book Details"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => { handleClose() }}
                open={isDataBookOpen}
            >
                {dataBookDetails
                    ?
                    <>
                        <p>ID: {dataBookDetails._id}</p>
                        <br />
                        <p>Title: {dataBookDetails.mainText}</p>
                        <br />
                        <p>Author: {dataBookDetails.author}</p>
                        <br />
                        <p>Category: {dataBookDetails.category}</p>
                        <br />
                        <p>Price: {
                            new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(dataBookDetails.price)
                        }</p>
                        <br />
                        <p>Quantity: {dataBookDetails.quantity}</p>
                        <br />
                        <p>Sold: {dataBookDetails.sold}</p>
                        <br />
                        <p>Thumbnail:</p>
                        <br />
                        <div style={{
                            width: '150px',
                            height: '150px',
                            border: '1px solid #ccc',

                        }}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetails.thumbnail}`} alt="book-image"
                                style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        </div>


                        {/* <div>
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
                        </div> */}
                        {
                            // preview &&
                            //     // <>
                            //     //     <div style={{
                            //     //         width: '150px',
                            //     //         height: '150px',
                            //     //         border: '1px solid #ccc',
                            //     //         marginTop: '20px',
                            //     //         marginBottom: '15px'
                            //     //     }}>
                            //     //         <img src={preview} alt="user-avatar"
                            //     //             style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                            //     //     </div>
                            //     //     {/* <Button onClick={() => { handleUploadUserAvatar() }}
                            //     //         type='primary'>Save</Button> */}
                            //     // </>
                        }
                    </>
                    :
                    // console.log("No user data")
                    <p>No book data.</p>
                }
            </Drawer>
        </>
    )
}

export default ViewBookDetails;