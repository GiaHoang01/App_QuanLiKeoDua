import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name: 'Danh mục',
    url: '',
    icon: "bi bi-list-task",
    children: [
      {
        name: 'Nhân viên',
        url: '/employee',
        icon: '',
        permission: 'Xem nhân viên',
      },
      {
        name: 'Hàng hóa',
        url: '/products',
        icon: '',
        permission: 'Xem hàng hóa',
      },
      {
        name: 'Khách hàng',
        url: '/customer',
        icon: '',
        permission: 'Xem khách hàng',
      },
      {
        name: 'Nhà cung cấp',
        url: '/vendor',
        icon: '',
        permission: 'Xem nhà cung cấp',
      }
    ]
  },
  {
    name: 'Bán hàng',
    url: '',
    icon: "bi bi-basket2-fill",
    children: [
      {
        name: 'Đơn đặt hàng',
        url: '/saleorder',
        icon: '',
        permission: 'Xem hóa đơn',
      },
      {
        name: 'Duyệt đơn hàng',
        url: '/confirmsaleorder',
        icon: '',
        permission: 'Xem hóa đơn', 
      }
    ]
  },
  {
    name: 'Nhập hàng',
    url: '',
    icon: "bi bi-box-seam-fill",
    children: [
      {
        name: 'Yêu cầu nhập hàng',
        url: '/purchaseOrderRequest',
        icon: '',
        permission: 'Xem phiếu nhập hàng', 
      },
      {
        name: 'Phiếu nhập hàng',
        url: '/purchaseOrder',
        icon: '',
        permission: 'Xem phiếu nhập hàng',
      },
      {
        name: 'Xác nhận phiếu nhập',
        url: '/confirmPurchaseOrder',
        icon: '',
        permission: 'Xem phiếu nhập hàng', 
      },
    ]
  },
  {
    name: 'Giao hàng',
    url: '',
    icon: "bi bi-truck",
    children: [
      {
        name:'Nhận phiếu giao hàng',
        url:'/shippingnoteconfirm',
        icon:'',
        permission: 'Xem phiếu giao hàng', 
      },
      {
        name:'Phiếu giao hàng',
        url:'/shippingnote',
        icon:'',
        permission: 'Xem phiếu giao hàng', 
      },
      {
        name:'Hủy phiếu giao hàng',
        url:'/shippingnotecancel',
        icon:'',
        permission: 'Xem phiếu giao hàng', 
      },
    ]
  } ,
  {
    name: 'Quản lý tồn kho',
    url: '/stock',
    icon: "bi bi-boxes",
    permission: 'Xem khuyến mãi',
  },
  {
    name: 'Khuyến mãi',
    url: '/promotion',
    icon: "bi bi-gift-fill",
    permission: 'Xem khuyến mãi',
  },
  {
    name: 'Tài khoản',
    url: '/accounts',
    icon: "bi bi-person-fill",
    permission: 'Xem tài khoản',
  },
  {
    name: 'Sao lưu & phục hồi',
    url: '/save',
    icon: "bi bi-database-fill",
    permission: 'Xem tài khoản',
  }
];