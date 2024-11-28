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
        url: '/product',
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
        permission: 'Cập nhật phiếu nhập hàng', 
      },
      {
        name: 'Phiếu nhập hàng',
        url: '/purchaseOrder',
        icon: '',
        permission: 'Xem phiếu nhập hàng',
      },
      {
        name: 'Duyệt phiếu nhập',
        url: '/confirmPurchaseOrder',
        icon: '',
        permission: 'Cập nhật phiếu nhập hàng', 
      },
    ]
  },
  {
    name: 'Quản lí kho',
    url: '',
    icon: "bi bi-database-fill",
    children: [
      {
        name:'Nhận phiếu giao hàng',
        url:'/shippingnoteconfirm',
        icon:''
      },
      {
        name:'Phiếu giao hàng',
        url:'/shippingnote',
        icon:'',
        permission: 'VIEW_SALE_ORDER', 
      },
    ]
  } ,
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
  }
];