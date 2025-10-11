import {faBoxOpen, faChartLine, faCloudUploadAlt, faTags, faUsers} from "@fortawesome/free-solid-svg-icons";

export const links = [
    { text: 'Dashboard', icon: faChartLine, href: '/', active: true },
    { text: 'Buyurtmalar', icon: faTags, href: '/orders' },
    { text: 'Kategoriyalar', icon: faTags, href: '/categories' },
    { text: 'Mahsulotlar', icon: faBoxOpen, href: '/products' },
    { text: 'Foydalanuvchilar', icon: faUsers, href: '/users' },
    { text: 'Fayllar', icon: faCloudUploadAlt, href: '/files' },
]