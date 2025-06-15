import { Button, Input, message, Modal, notification, Upload } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFiles } from "../../service/api.service";
import { UploadOutlined } from "@ant-design/icons";


const BookForm = (props) => {

    const { loadBook } = props;

    const [thumbnail, setThumbnail] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)


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

        // const handleUploadBookPic = async () => {
        //     const resUpload = await handleUploadFiles(selectedFile, "book")
        //     // console.log("check resUpload", resUpload)
        //     if (resUpload.data) {
        //         const newBookPic = resUpload.data.fileUploaded;
        //         // console.log("check newAvatar: ", newAvatar)
        //         const resUploadBookPic = await updateUserAvatarAPI(newBookPic, dataView._id, dataView.fullName, dataView.phone)
        //         if (resUploadBookPic.data) {
        //             setThumbnail(newBookPic)
        //             setSelectedFile(null)
        //             setPreview(null)
        //             await loadBook()
        //             notification.success({
        //                 message: "Update book pic",
        //                 description: "Updated book pic successfully"
        //             })
        //         }
        //         else {
        //             notification.error({
        //                 message: "Error upload file",
        //                 description: JSON.stringify(resUploadBookPic.message)
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
        // const resUpload = await handleUploadFiles(selectedFile, "book")
        // if (resUpload.data) {
        //     const newBookPic = resUpload.data.fileUploaded;
        //     setThumbnail(newBookPic)
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
    // else {
    //     notification.error({
    //         message: "Error file upload",
    //         description: JSON.stringify(resUpload.message)
    //     })
    //     return;
    // }



    const resetModal = () => {
        setIsModalOpen(false);
        setThumbnail("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
    }

    return (
        <div className="user-form" style={{ margin: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Table Book</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create Book
                </Button>
            </div>

            <div>
                <Modal title="Create Book"
                    open={isModalOpen}
                    onOk={() => handleSubmit()}
                    onCancel={() => resetModal()}
                    okText="Create"
                    maskClosable={false}>
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
                            <Input
                                value={price}
                                onChange={(event) => { setPrice(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Quantity</span>
                            <Input
                                value={quantity}
                                onChange={(event) => { setQuantity(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Category</span>
                            <Input
                                value={category}
                                onChange={(event) => { setCategory(event.target.value) }}
                            />
                        </div>
                        {/* <Upload
                            beforeUpload={(event) => handleUploadFile(event)}
                            showUploadList={true}
                        accept="image/*"
                        >
                            <Button type="primary" icon={<UploadOutlined />}>
                                Upload Book Picture
                            </Button>
                        </Upload> */}
                    </div>
                </Modal>
            </div>


        </div>
    )
}

export default BookForm;