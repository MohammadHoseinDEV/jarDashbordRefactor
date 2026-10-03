import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MENU_URL } from '../permission/menuKeys';

// AdminPages
const AdminMenus = lazy(
  () => import('../features/dashboard/pages/admin/menu/AdminMenus')
);
const AdminRoles = lazy(
  () => import('../features/dashboard/pages/admin/role/AdminRoles')
);
const AdminUsers = lazy(
  () => import('../features/dashboard/pages/admin/users/AdminUsers')
);
const AdminEducation = lazy(
  () => import('../features/dashboard/pages/admin/education/AdminEducation')
);
const AdminJobPosition = lazy(
  () => import('../features/dashboard/pages/admin/jobPosition/AdminJobPosition')
);
const AdminOrganization = lazy(
  () =>
    import('../features/dashboard/pages/admin/organization/AdminOrganization')
);
const AdminShift = lazy(
  () => import('../features/dashboard/pages/admin/shift/AdminShift')
);
const HoldingPage = lazy(
  () => import('../features/dashboard/pages/admin/holding/HoldingPage')
);
const DepartmentPage = lazy(
  () => import('../features/dashboard/pages/admin/department/DepartmentPage')
);
const AdminUnits = lazy(
  () => import('../features/dashboard/pages/admin/unit/AdminUnits')
);
// -------------------------------------------------------------------------

// ProductsPage
const CreateProducts = lazy(
  () => import('../features/product_wareHouse/pages/products/CreateProducts')
);

// Products Planing
const FinalLineChange = lazy(
  () =>
    import('../features/products-planning/pages/finalLineChange/FinalLineChange')
);

// Work Reports
const MachiningWorkReport = lazy(
  () =>
    import('../features/work-Report/pages/MachiningWorkReport/MachiningWorkReport')
);
const MechanicalReport = lazy(
  () => import('../features/work-Report/pages/Mechanical/MechanicalReport')
);
const FacilityReport = lazy(
  () => import('../features/work-Report/pages/Facility/FacilityReport')
);
const PolishingReport = lazy(
  () => import('../features/work-Report/pages/Polishing/PolishingReport')
);
const QualityControl = lazy(
  () =>
    import('../features/work-Report/pages/QualityControl-Package/QualityControl')
);

// Advanced Reports
const PersonnelReports = lazy(
  () => import('../features/advaned_reports/office/Pages/PersonnelReports')
);
const ElectricalReport = lazy(
  () => import('../features/work-Report/pages/Electrical/ElectricalReport')
);
const ProductionReport = lazy(
  () => import('../features/work-Report/pages/Production/ProductionReport')
);
const MechanicalBachplantReport = lazy(
  () =>
    import('../features/work-Report/pages/MechanicalBachPlant/MechanicalBachplantReport')
);
const BachplantReport = lazy(
  () => import('../features/work-Report/pages/Bachplant/BachplantReport')
);
const ElectricityUpsReport = lazy(
  () =>
    import('../features/electricity/Pages/electricityUPS/ElectricityUpsReport')
);
const DailyAmpReport = lazy(
  () => import('../features/electricity/Pages/dailyAmp/DailyAmpReport')
);
const ControlChecklistReport = lazy(
  () =>
    import('../features/electricity/Pages/controlChecklist/ControlChecklistReport')
);
const EarthWellReport = lazy(
  () => import('../features/electricity/Pages/earthWell/EarthWellReport')
);
const WeeklyAmpReport = lazy(
  () => import('../features/electricity/Pages/dailyAmpWeekly/WeeklyAmpReport')
);
const BiWeeklyAmpReport = lazy(
  () => import('../features/electricity/Pages/BiWeeklyAmp/BiWeeklyAmpReport')
);

const LineChangeChecklist = lazy(
  () =>
    import('../features/electricity/Pages/lineChangeChecklist/LineChangeChecklist')
);
// 5271
const DesignDataForm = lazy(
  () => import('../features/mold-design/Pages/designDataForm/DesignDataForm')
);
const MoldDarwingForm = lazy(
  () => import('../features/mold-design/Pages/moldDarwingForm/MoldDarwingForm')
);
const ProductWeightStandardForm = lazy(
  () =>
    import('../features/mold-design/Pages/productsWeightStandardForm/ProductWeightStandardForm')
);
const InternalDesignPhasePlanning = lazy(
  () =>
    import('../features/mold-design/Pages/internalDesign/InternalDesignPhasePlanning')
);
const DesignPhasePlanning = lazy(
  () =>
    import('../features/mold-design/Pages/designPhasePlanning/DesignPhasePlanning')
);

const DesignWorkRequest = lazy(
  () =>
    import('../features/mold-design/Pages/designWorkRequest/DesignWorkRequest')
);
const DesignMeeting = lazy(
  () => import('../features/mold-design/Pages/designMeeting/Designmeeting')
);

const MoldFieldValidation = lazy(
  () =>
    import('../features/mold-design/Pages/moldFieldValidation/MoldFieldValidation')
);

const BachFormulationChange = lazy(
  () =>
    import('../features/bachPlant/pages/bachFormulationChange/BachFormulationChange')
);

// 5258
const ReportProducts = lazy(
  () =>
    import('../features/product_wareHouse/pages/reportProducts/ReportProducts')
);
const PrintLabels = lazy(
  () => import('../features/product_wareHouse/pages/labels/PrintLabels')
);

const CustomerManagment = lazy(
  () =>
    import('../features/products-cost/Pages/customerManagment/CustomerManagment')
);

const SalesTransfer = lazy(
  () => import('../features/products-cost/Pages/salesTansfer/SalesTransfer')
);

const LoadingProducts = lazy(
  () =>
    import('../features/products-cost/Pages/loadingProducts/LoadingProducts')
);

const pagesMap = {
  [MENU_URL.ADMIN_MENUS]: AdminMenus,
  [MENU_URL.ADMIN_UNITS]: AdminUnits,
  [MENU_URL.ADMIN_ROLES]: AdminRoles,
  [MENU_URL.ADMIN_USER]: AdminUsers,
  [MENU_URL.ADMIN_EDUCATIONS]: AdminEducation,
  [MENU_URL.ADMIN_JOB_POSITION]: AdminJobPosition,
  [MENU_URL.ADMIN_ORGANIZATION]: AdminOrganization,
  [MENU_URL.ADMIN_SHIFT]: AdminShift,
  [MENU_URL.ADMIN_HOLDING]: HoldingPage,
  [MENU_URL.ADMIN_DEPARTMENT]: DepartmentPage,

  [MENU_URL.PRODUCTION_REPORT]: ProductionReport,

  [MENU_URL.MACHINING_REPORT]: MachiningWorkReport,
  [MENU_URL.MECHANICAL_BACHPLANT_REPORT]: MechanicalBachplantReport,
  [MENU_URL.MECHANICAL_REPORT]: MechanicalReport,
  [MENU_URL.FACILITY_REPORT]: FacilityReport,
  [MENU_URL.POLISHING_REPORT]: PolishingReport,
  [MENU_URL.QUALITY_CONTROL_PACKAGE_REPORT]: QualityControl,
  [MENU_URL.ELECTRICAL_REPORT]: ElectricalReport,
  [MENU_URL.BACHPLANT_REPORT]: BachplantReport,

  [MENU_URL.UPS_BATTERY_VOLTAGE_REPORT]: ElectricityUpsReport,
  [MENU_URL.DAILY_AMP_REPORT]: DailyAmpReport,
  [MENU_URL.CONTROL_CHECKLIST_REPORT]: ControlChecklistReport,
  [MENU_URL.VISIT_EARTH_WELL]: EarthWellReport,
  [MENU_URL.WEEKLY_AMP]: WeeklyAmpReport,
  [MENU_URL.BIWEEKLY_AMP]: BiWeeklyAmpReport,
  [MENU_URL.LINE_CHANGE_CHECKLIST]: LineChangeChecklist,

  [MENU_URL.DEFINITION_OF_PRODUCT]: CreateProducts,
  [MENU_URL.FINAL_NOTIFICATION_OF_LINE_CHANGE]: FinalLineChange,
  [MENU_URL.PERSONNEL_REPORTS]: PersonnelReports,

  [MENU_URL.DESIGN_DATA_AND_DRAWING_VERIFICATION_FORM]: DesignDataForm,
  [MENU_URL.MOLD_DRAWING_VERIFICATION_FORM]: MoldDarwingForm,
  [MENU_URL.PRODUCT_WEIGHT_STANDARD_FORM]: ProductWeightStandardForm,
  [MENU_URL.INTERNAL_DESIGN_PHASE_PLANNING]: InternalDesignPhasePlanning,
  [MENU_URL.DESIGN_PHASE_PLANNING]: DesignPhasePlanning,
  [MENU_URL.DESIGN_WORK_REQUEST_FORM]: DesignWorkRequest,
  [MENU_URL.DESIGN_MEETING]: DesignMeeting,
  [MENU_URL.MOLD_FIELD_VALIDATION_FORM]: MoldFieldValidation,

  [MENU_URL.BATCH_FORMULATION_CHANGE_REPORT]: BachFormulationChange,

  [MENU_URL.REPORT_PRODUCTS]: ReportProducts,
  [MENU_URL.PRINT_LABELS]: PrintLabels,
  [MENU_URL.CUSTOMER_MANAGEMENT]: CustomerManagment,
  [MENU_URL.SALES_TRANSFER]: SalesTransfer,
  [MENU_URL.LOADING_PRODUCTS]: LoadingProducts,
};

export default function DynamicPage() {
  const { page } = useParams();
  const PageComponent = pagesMap[page];

  if (!PageComponent) return <div>صفحه پیدا نشد</div>;

  return <PageComponent />;
}
