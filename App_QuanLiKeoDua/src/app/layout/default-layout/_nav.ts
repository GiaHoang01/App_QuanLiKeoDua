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
        url:'/purchaseorder',
        icon:''
      },
      {
        name:'Phiếu nhập hàng',
        url:'/purchaseorder',
        icon:''
      },
    ]
  },
  {
    name: 'Tài khoản',
    url: '/accounts',
    icon:"bi bi-person-fill",
  }
 
];
