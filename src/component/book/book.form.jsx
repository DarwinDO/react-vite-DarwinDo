import { Button, Input, message, Modal, notification, Upload, InputNumber, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFiles } from "../../service/api.service";
import { UploadOutlined } from "@ant-design/icons";


const BookForm = (props) => {

    const { loadBook, isModalOpen, setIsModalOpen } = props;

    // const [thumbnail, setThumbnail] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()



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

        // const handleUploadBookThumbnail = async () => {
        //     const resUpload = await handleUploadFiles(selectedFile, "book")
        //     // console.log("check resUpload", resUpload)
        //     if (resUpload.data) {
        //         const newBookPic = resUpload.data.fileUploaded;
        //         // console.log("check newAvatar: ", newAvatar)
        //         const resUploadBookThumbnail = await updateUserAvatarAPI(newBookPic, dataView._id, dataView.fullName, dataView.phone)
        //         if (resUploadBookThumbnail.data) {
        //             setThumbnail(newBookPic)
        //             setSelectedFile(null)
        //             setPreview(null)
        //             await loadBook()
        //             notification.success({
        //                 message: "Update book thumbnail",
        //                 description: "Updated book thumbnail successfully"
        //             })
        //         }
        //         else {
        //             notification.error({
        //                 message: "Error upload file",
        //                 description: JSON.stringify(resUploadBookThumbnail.message)
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

        ;

    const handleSubmit = async () => {
        const resUpload = await handleUploadFiles(selectedFile, "book")
        // console.log("check resUpload", resUpload);
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            // console.log("check newBookThumbnail", newBookThumbnail);
            // // setThumbnail(newBookThumbnail) 
            /* Đánh dấu để cập nhật state nhưng không cập nhật state ngay. 
            Vì React "gom nhóm" tất cả các state updates trong cùng 1 event handler 
            và chỉ re-render 1 lần duy nhất để tối ưu performance */
            // console.log("check thumbnail", thumbnail); // -> Vẫn là giá trị CŨ (rỗng)
            const res = await createBookAPI(thumbnail, mainText, author, price, quantity, category);
            if (res.data) {
                notification.success({
                    message: "Create Book",
                    description: "Book created successfully"
                })
                resetModal();
                await loadBook();
            }
            else {
                notification.error({
                    message: "Create Book",
                    description: JSON.stringify(res.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error file upload",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }
    }

    const resetModal = () => {
        setIsModalOpen(false);
        // setThumbnail("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null)
        setPreview(null)
    }

    return (
        <div className="book-form" style={{ margin: '10px 0' }}>
            <div>
                <Modal title="Create Book"
                    open={isModalOpen}
                    onOk={() => { handleSubmit() }}
                    onCancel={() => resetModal()}
                    okText="Create"
                    maskClosable={false}
                >
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div>
                            <span >Title</span>
                            <Input
                                value={mainText}
                                onChange={(event) => { setMainText(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Author</span>
                            <Input
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Price</span>
                            <InputNumber
                                style={{ width: '100%' }}
                                value={price}
                                addonAfter="đ"
                                onChange={(event) => { setPrice(event) }}
                            /* 
                            - hàm onChange trong InputNumber, Select,... của antd sẽ tự động nhận value từ input
                            - Không cần event.target.value để lấy value nữa
                            - Nên chỉ cần onChange={(event) => { setPrice(event) }}
                            */
                            />
                        </div>
                        <div>
                            <span>Quantity</span>
                            <InputNumber
                                style={{ width: '100%' }}
                                value={quantity}
                                onChange={(event) => { setQuantity(event) }}
                            />
                        </div>
                        <div>
                            <span>Category</span>
                            <Select
                                value={category}
                                style={{ width: '100%' }}
                                onChange={(event) => { setCategory(event) }}
                                options={[
                                    { value: 'Arts', label: 'Arts' },
                                    { value: 'Business', label: 'Business' },
                                    { value: 'Comics', label: 'Comics' },

                                    { value: 'Cooking', label: 'Cooking' },
                                    { value: 'Entertainment', label: 'Entertainment' },
                                    { value: 'History', label: 'History' },

                                    { value: 'Music', label: 'Music' },
                                    { value: 'Sports', label: 'Sports' },
                                    { value: 'Teen', label: 'Teen' },
                                    { value: 'Travel', label: 'Travel' },

                                ]}

                            />
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

                                Upload book thumbnail </label>
                            <input type="file" hidden id='btnUpload'
                                onChange={(event) => { handleUploadFile(event) }}
                                onClick={(event) => { event.target.value = null }}
                            />
                        </div>
                        {
                            preview &&
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
                                {/* <Button onClick={() => { handleUploadBookThumbnail() }}
                                    type='primary'>Save</Button> */}
                            </>
                        }

                    </div>
                </Modal>
            </div>


        </div>
    )

}

export default BookForm;