import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../service/api.service";
import BookForm from "../component/book/book.form";
import BookTable from "../component/book/book.table";

const BookPage = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => { loadBook() }
        , [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }

    }
    return (
        <div>
            <div style={{ padding: '20px' }}>
                <BookTable
                    loadBook={loadBook}
                    dataBook={dataBook}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default BookPage;