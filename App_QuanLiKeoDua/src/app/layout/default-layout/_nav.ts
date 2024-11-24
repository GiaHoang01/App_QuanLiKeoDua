import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Danh mục',
    url: '',
    icon:"bi bi-list-task",
    children: [
      {
        name: 'Nhân viên',
        url: '/employee',
        icon: '',
      },
      {
        name: 'Hàng hóa',
        url: '/product',
        icon: '',
      },
      {
        name: 'Khách hàng',
        url: '/customer',
        icon: '',
      }
    ]
  },
  {
    name: 'Bán hàng',
    url: '',
    icon:"bi bi-basket2-fill",
    children:[
      {
        name:'Đơn đặt hàng',
        url:'/saleorder',
        icon:''
      },
      {
        name:'Duyệt đơn hàng',
        url:'/confirmsaleorder',
        icon:''
      }
    ]
  },
  {
    name: 'Nhập hàng',
    url: '',
    icon:"bi bi-box-seam-fill",
    children:[
      {
        name:'Yêu cầu nhập hàng',
        url:'/purchaseOrderRequest',
        icon:''
      },
      {
        name:'Phiếu nhập hàng',
        url:'/purchaseOrder',
        icon:''
      },
    ]
  },
  {
    name: 'Quản lí kho',
    url: '',
    icon:"bi bi-database-fill",
    children:[
      {
        name:'Duyệt phiếu nhập',
        url:'/confirmPurchaseOrder',
        icon:''
      },
      {
        name:'Phiếu giao hàng',
        url:'/shippingnote',
        icon:''
      }
    ]
  },
  {
    name: 'Tài khoản',
    url: '/accounts',
    icon:"bi bi-person-fill",
  }
 
];
