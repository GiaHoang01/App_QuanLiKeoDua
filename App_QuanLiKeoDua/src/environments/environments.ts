
const API_BASE = "http://localhost:5047/api/";
export const API_ENDPOINT = {
   
    ACCOUNT_ENDPOINT: {
        LOGIN: API_BASE + "TaiKhoan/",
    },
    EMPLOYEES_ENDPOINT: {
        EMPLOYEE: API_BASE + "NhanVien/",
    },
    NHOMQUYEN_ENDPOINT: {
        NhomQuyen: API_BASE + "NhomQuyen/",
    },
    PURCHASE_ENDPOINT:{
        PURCHASE_ORDER:API_BASE + "PhieuNhapHang/",
    },
    PRODUCT_ENDPOINT:{
        PRODUCT:API_BASE + "HangHoa/",
    },
    PROMOTION_ENDPOINT:{
        PROMOTION:API_BASE + "ChuongTrinhKhuyenMai/",
    },
    ORDER_ENDPOINT:{
        SALEINVOICE_ORDER:API_BASE + "HoaDonBanHang/",
    },
    VENDOR_ENDPOINT:{
        VENDOR:API_BASE+"NhaCungCap/",
    },
    CUSTOMER_ENDPOINT:{
        CUSTOMER: API_BASE + "KhachHang/"
    },
    SHIPPING_ENDPOINT:{
        SHIPPING_NOTE: API_BASE + "PhieuGiaoHang/",
        SHIPPING_NOTE_CANCEL: API_BASE + "PhieuHuyDon/"
    }
}
