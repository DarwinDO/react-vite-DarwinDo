import { createContext, useState } from "react";


export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
// 1. Create a context
// 2. Create a wrapper
// 3. Use the context in App

/*
Tạo AuthContext là để tạo ra một "ngữ cảnh" (context) lưu trữ thông tin xác thực (auth) của người dùng, ví dụ như thông tin user, token, v.v. Tuy nhiên, chỉ tạo AuthContext thôi thì chưa đủ, vì:

- AuthContext chỉ là một đối tượng context rỗng, nó không tự lưu trữ hay cung cấp dữ liệu gì cả.
- Để truyền dữ liệu (state) vào context cho các component con sử dụng, bạn cần một Provider. Provider này sẽ "bọc" (wrap) các component con và truyền giá trị (value) xuống.

AuthWrapper chính là một component dùng để bọc (wrap) toàn bộ ứng dụng hoặc phần cần dùng context, và truyền giá trị user, setUser vào AuthContext.Provider.

Nếu chỉ tạo mỗi AuthContext mà không có AuthWrapper (hoặc không dùng Provider), thì các component con sẽ không nhận được giá trị context, và useContext(AuthContext) sẽ luôn trả về giá trị mặc định (hoặc undefined).

Tóm lại:
- AuthContext: tạo ra context.
- AuthWrapper: cung cấp giá trị context cho các component con.

=> Cần cả hai để context hoạt động đúng. Không thể chỉ tạo mỗi AuthContext mà không dùng Provider (AuthWrapper).
*/
