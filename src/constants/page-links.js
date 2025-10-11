import { faChartLine, faShoppingBag, faFolder, faBoxOpen, faUsers, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

export const links = [
    { text: 'Dashboard', icon: faChartLine, href: '/dashboard' },
    { text: 'Buyurtmalar', icon: faShoppingBag, href: '/orders' },
    { text: 'Kategoriyalar', icon: faFolder, href: '/categories' },
    { text: 'Mahsulotlar', icon: faBoxOpen, href: '/products' },
    { text: 'Foydalanuvchilar', icon: faUsers, href: '/users' },
    { text: 'Fayllar', icon: faCloudUploadAlt, href: '/files' },
];