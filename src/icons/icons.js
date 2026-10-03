import company from '../assets/images/factory.png';
import education from '../assets/images/graduation.png';
import jobPosition from '../assets/images/JobSearch.png';
import menu from '../assets/images/menu.png';
import organization from '../assets/images/organization.png';
import shift from '../assets/images/replacement.png';
import system from '../assets/images/system.png';
import user from '../assets/images/users.png';
import role from '../assets/images/role.png';
import unit from '../assets/images/office.png';
import { FaBolt, FaHeading } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { GiLaserPrecision } from 'react-icons/gi';
import { GiBrokenBottle } from 'react-icons/gi';
import { FaWrench } from 'react-icons/fa';
import { GiPipes } from 'react-icons/gi';
import {
  MdCheckCircle,
  MdProductionQuantityLimits,
  MdWarehouse,
} from 'react-icons/md';
import { SiAltiumdesigner } from 'react-icons/si';
import { PiCertificate } from 'react-icons/pi';
import { LuNotebookPen } from 'react-icons/lu';
import { SlPrinter } from 'react-icons/sl';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { GrDocumentTransfer } from 'react-icons/gr';
import { FaD } from 'react-icons/fa6';

export const MENU_ICON_MAP = {
  system,
  menu,
  roles: role,
  users: user,
  education,
  jobPosition,
  organization,
  shift,
  company,
  unit,
  electrical: FaBolt,
  report: FaClipboardList,
  production: FaCogs,
  machining: GiLaserPrecision,
  bachplant: GiBrokenBottle,
  mechanical: FaWrench,
  facility: GiPipes,
  QC: MdCheckCircle,
  Design: SiAltiumdesigner,
  warehouse: MdWarehouse,
  certificate: PiCertificate,
  planning: LuNotebookPen,
  print: SlPrinter,
  productCost: MdProductionQuantityLimits,
  customerManagement: RiCustomerService2Fill,
  salesTransfer: GrDocumentTransfer,
  holding: FaHeading,
  department: FaD,
};

export const MENU_ICON_OPTIONS = [
  { key: 'system', label: 'مدیریت سیستم' },
  { key: 'system1', label: 'مدیریت سیستم 1' },
  { key: 'menu', label: 'مدیریت منو' },
  { key: 'roles', label: 'مدیریت نقش ها' },
  { key: 'users', label: 'مدیریت کاربران' },
  { key: 'education', label: 'مدارک تحصیلی' },
  { key: 'jobPosition', label: 'جایگاه شغلی' },
  { key: 'organization', label: 'چارت سازمانی' },
  { key: 'shift', label: 'شیفت ها' },
  { key: 'company', label: 'شرکت ها' },
  { key: 'unit', label: 'واحد ها' },
  { key: 'electrical', label: 'برق' },
  { key: 'report', label: 'گزارش' },
  { key: 'production', label: 'تولید' },
  { key: 'machining', label: 'تراشکاری' },
  { key: 'bachplant', label: 'بچ پلانت' },
  { key: 'mechanical', label: 'مکانیک' },
  { key: 'facility', label: 'تاسیسات' },
  { key: 'QC', label: 'کنترل کیفیت و بسته بندی' },
  { key: 'Design', label: 'طراحی قالب' },
  { key: 'warehouse', label: 'انبار محصول' },
  { key: 'certificate', label: 'شناسنامه محصولات' },
  { key: 'planning', label: 'برنامه ریزی تولید' },
  { key: 'print', label: 'چاپ لیبل' },
  { key: 'productCost', label: 'خروج محصول' },
  { key: 'customerManagement', label: 'مدیریت مشتری ها' },
  { key: 'salesTransfer', label: 'ثبت حواله' },
  { key: 'holding', label: 'هلدینگ' },
  { key: 'department', label: 'دپارتمان' },
];
