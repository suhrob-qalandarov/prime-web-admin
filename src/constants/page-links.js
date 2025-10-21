import { faChartLine, faShoppingBag, faFolder, faBoxOpen, faUsers, faCloudUploadAlt, faWarehouse } from "@fortawesome/free-solid-svg-icons";

export const links = [
    { text: 'Dashboard', icon: faChartLine, href: '/dashboard' },
    { text: 'Ombor', icon: faWarehouse, href: '/warehouse' },
    { text: 'Buyurtmalar', icon: faShoppingBag, href: '/orders' },
    { text: 'Kategoriyalar', icon: faFolder, href: '/categories' },
    { text: 'Mahsulotlar', icon: faBoxOpen, href: '/products' },
    { text: 'Foydalanuvchilar', icon: faUsers, href: '/users' },
    { text: 'Fayllar', icon: faCloudUploadAlt, href: '/files' },
];