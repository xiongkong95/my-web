// =====================================================================
// ຂໍ້ຄວາມທັງໝົດຂອງເວັບ ໃນ 2 ພາສາ: ລາວ (lo) ແລະ ອັງກິດ (en)
// ---------------------------------------------------------------------
// - ພາສາລາວ = ພາສາຫຼັກ (ເປີດເວັບມາຈະເປັນພາສານີ້)
// - ພາສາອັງກິດ = ພາສາສຳຮອງ (ກົດປຸ່ມ EN ເພື່ອປ່ຽນ)
// ວິທີແກ້ຂໍ້ຄວາມ: ແກ້ຢູ່ໄຟລ໌ນີ້ບ່ອນດຽວ ທຸກໜ້າຈະປ່ຽນຕາມ
// ວິທີເພີ່ມຂໍ້ຄວາມໃໝ່: ເພີ່ມ key ດຽວກັນໃນທັງ lo ແລະ en
//   (ຖ້າລືມເພີ່ມໃນ en, TypeScript ຈະແຈ້ງ error ໃຫ້ ເພາະ en ຕ້ອງມີ key ຄືກັບ lo)
// ວິທີໃຊ້ໃນ component:
//   const { t } = useLanguage();
//   <h1>{t.login.title}</h1>
// =====================================================================

// ພາສາທີ່ຮອງຮັບ
export type Lang = "lo" | "en";

// ---------- ພາສາລາວ (ພາສາຫຼັກ) ----------
const lo = {
  // ປຸ່ມສະຫຼັບພາສາ/theme
  toggle: {
    switchLabel: "EN", // ຂໍ້ຄວາມເທິງປຸ່ມ = ພາສາທີ່ຈະປ່ຽນໄປ
    switchAria: "Switch to English",
    theme: "ສະຫຼັບໂໝດມືດ",
  },

  // ສ່ວນຮ່ວມຂອງໜ້າ Login ແລະ Register
  auth: {
    tagline: "ຊອກຫາລົດໃນຝັນຂອງທ່ານ",
    subtagline: "ລົດໃໝ່ຄຸນນະພາບ ພ້ອມບໍລິການຫຼັງການຂາຍ",
    orContinue: "ຫຼື ສືບຕໍ່ດ້ວຍ",
    google: "ສືບຕໍ່ດ້ວຍ Google",
    googleNotReady: "ການເຂົ້າສູ່ລະບົບດ້ວຍ Google ຍັງບໍ່ທັນເປີດໃຊ້",
  },

  // ຊ່ອງພິມໃນຟອມ
  fields: {
    name: "ຊື່",
    namePlaceholder: "ຊື່ຂອງທ່ານ",
    email: "ອີເມວ",
    emailPlaceholder: "you@example.com",
    password: "ລະຫັດຜ່ານ",
    passwordPlaceholder: "ປ້ອນລະຫັດຜ່ານ",
    passwordMinPlaceholder: "ຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ",
    confirmPassword: "ຢືນຢັນລະຫັດຜ່ານ",
    confirmPlaceholder: "ປ້ອນລະຫັດຜ່ານອີກຄັ້ງ",
    showPassword: "ສະແດງລະຫັດຜ່ານ",
    hidePassword: "ເຊື່ອງລະຫັດຜ່ານ",
    errEmailInvalid: "ອີເມວບໍ່ຖືກຕ້ອງ (ຕົວຢ່າງ: noy@gmail.com)",
  },

  // ໜ້າ Login
  login: {
    title: "ຍິນດີຕ້ອນຮັບກັບມາ",
    forgot: "ລືມລະຫັດຜ່ານ?",
    submit: "ເຂົ້າສູ່ລະບົບ",
    noAccount: "ຍັງບໍ່ມີບັນຊີ?",
    signUp: "ລົງທະບຽນ",
    errEmpty: "ກະລຸນາປ້ອນອີເມວ ແລະລະຫັດຜ່ານ",
    errNoAccount: "ຍັງບໍ່ມີບັນຊີ ກະລຸນາລົງທະບຽນກ່ອນ",
    errWrong: "ອີເມວ ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
  },

  // ໜ້າ Register
  register: {
    title: "ສ້າງບັນຊີໃໝ່",
    submit: "ລົງທະບຽນ",
    haveAccount: "ມີບັນຊີແລ້ວ?",
    login: "ເຂົ້າສູ່ລະບົບ",
    errEmpty: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບທຸກຊ່ອງ",
    errPasswordShort: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ",
    errMismatch: "ລະຫັດຜ່ານ ແລະການຢືນຢັນບໍ່ກົງກັນ",
    success: "ລົງທະບຽນສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ",
  },

  // ໜ້າ Dashboard
  dashboard: {
    welcome: "ສະບາຍດີ,",
    guest: "ແຂກ",
    subtitle: "ນີ້ແມ່ນສະຖານະຂອງໂຊຣູມທ່ານໃນມື້ນີ້",
    periodAria: "ເລືອກຊ່ວງເວລາ",
    search: "ຄົ້ນຫາລົດ, ລູກຄ້າ...",
    notifications: "ການແຈ້ງເຕືອນ",
    settings: "ຕັ້ງຄ່າ",
    logout: "ອອກຈາກລະບົບ",
  },

  // ເມນູດ້ານຊ້າຍ
  menu: {
    dashboard: "ໜ້າຫຼັກ",
    cars: "ລົດ",
    orders: "ການສັ່ງຊື້",
    customers: "ລູກຄ້າ",
    reports: "ລາຍງານ",
    settings: "ຕັ້ງຄ່າ",
    support: "ຊ່ວຍເຫຼືອ",
    logout: "ອອກຈາກລະບົບ",
  },

  // ກາດສະຖິຕິ
  stats: {
    carsInStock: "ລົດໃນສາງ",
    sold: "ຂາຍໄດ້",
    revenue: "ລາຍຮັບ",
    newCustomers: "ລູກຄ້າໃໝ່",
    carsUnit: "ຄັນ",
    peopleUnit: "ຄົນ",
    vsLastMonth: "ທຽບກັບເດືອນກ່ອນ",
  },

  // ກຣາຟຍອດຂາຍ
  chart: {
    title: "ພາບລວມຍອດຂາຍ",
    sales: "ຍອດຂາຍ",
  },

  // ກາດລົດຂາຍດີ
  topCars: {
    title: "ລົດຂາຍດີ",
    sedan: "ເກັງ",
    suv: "SUV",
    pickup: "ກະບະ",
    sold: "ຂາຍແລ້ວ",
    stock: "ໃນສາງ",
  },

  // ກາດລາຍການສັ່ງຊື້
  orders: {
    title: "ການສັ່ງຊື້",
    empty: "ບໍ່ມີການສັ່ງຊື້ໃນຊ່ວງນີ້",
    seeAll: "ເບິ່ງທັງໝົດ",
    order: "ເລກທີ",
    customer: "ລູກຄ້າ",
    car: "ລົດ",
    date: "ວັນທີ",
    price: "ລາຄາ",
    status: "ສະຖານະ",
    paid: "ຈ່າຍແລ້ວ",
    pending: "ລໍຖ້າຈ່າຍ",
  },

  // ປຸ່ມເລືອກຊ່ວງເວລາ (ໃນສ່ວນຫົວຂອງ Dashboard)
  periods: { day: "ມື້", week: "ອາທິດ", month: "ເດືອນ", year: "ປີ" },

  // ຊ່ວງເວລາແບບເຕັມ (ສະແດງຂ້າງຫົວຂໍ້ກາດ)
  periodRange: { day: "ມື້ນີ້", week: "7 ວັນລ່າສຸດ", month: "4 ອາທິດລ່າສຸດ", year: "12 ເດືອນລ່າສຸດ" },

  // ຂໍ້ຄວາມທ້າຍ % ປ່ຽນແປງ
  vsPrevious: {
    day: "ທຽບກັບມື້ວານ",
    week: "ທຽບກັບ 7 ວັນກ່ອນ",
    month: "ທຽບກັບ 4 ອາທິດກ່ອນ",
    year: "ທຽບກັບປີກ່ອນ",
  },

  // ຊື່ເດືອນ (ໃຊ້ສະແດງວັນທີ) ລຽງຈາກ ມັງກອນ (1) ຫາ ທັນວາ (12)
  months: [
    "ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ",
    "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ",
  ],

  // ແປປ້າຍຂອງກຣາຟ: ຂໍ້ມູນໃນ dashboard-data ເປັນພາສາອັງກິດ (ເຊັ່ນ "Mon", "Jun")
  // ຕາຕະລາງນີ້ບອກວ່າແຕ່ລະຄຳ ໃຫ້ສະແດງເປັນຫຍັງ
  // "as Record<string, string>" = ບອກ TypeScript ວ່າເປັນ object ທີ່ key ແລະຄ່າ ເປັນຂໍ້ຄວາມໃດກໍໄດ້
  chartLabels: {
    Mon: "ຈັນ", Tue: "ອັງຄານ", Wed: "ພຸດ", Thu: "ພະຫັດ", Fri: "ສຸກ", Sat: "ເສົາ", Sun: "ອາທິດ",
    "Week 1": "ອາທິດທີ 1", "Week 2": "ອາທິດທີ 2", "Week 3": "ອາທິດທີ 3", "Week 4": "ອາທິດທີ 4",
    Jan: "ມ.ກ.", Feb: "ກ.ພ.", Mar: "ມ.ນ.", Apr: "ມ.ສ.", May: "ພ.ພ.", Jun: "ມິ.ຖ.",
    Jul: "ກ.ລ.", Aug: "ສ.ຫ.", Sep: "ກ.ຍ.", Oct: "ຕ.ລ.", Nov: "ພ.ຈ.", Dec: "ທ.ວ.",
  } as Record<string, string>,
};

// ປະເພດຂອງຂໍ້ຄວາມ = ໂຄງສ້າງດຽວກັບ lo (typeof = ເອົາ type ຈາກຕົວແປ)
export type Translation = typeof lo;

// ---------- ພາສາອັງກິດ (ພາສາສຳຮອງ) ----------
// ": Translation" = ບັງຄັບໃຫ້ມີ key ຄົບຄືກັບ lo
const en: Translation = {
  toggle: {
    switchLabel: "ລາວ",
    switchAria: "ປ່ຽນເປັນພາສາລາວ",
    theme: "Toggle dark mode",
  },
  auth: {
    tagline: "Find your dream car",
    subtagline: "Quality new cars with after-sales service",
    orContinue: "or continue with",
    google: "Continue with Google",
    googleNotReady: "Google login is not available yet",
  },
  fields: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    passwordMinPlaceholder: "At least 6 characters",
    confirmPassword: "Confirm password",
    confirmPlaceholder: "Enter your password again",
    showPassword: "Show password",
    hidePassword: "Hide password",
    errEmailInvalid: "Invalid email (example: noy@gmail.com)",
  },
  login: {
    title: "Welcome back",
    forgot: "Forgot password?",
    submit: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    errEmpty: "Please enter your email and password",
    errNoAccount: "No account yet. Please sign up first",
    errWrong: "Incorrect email or password",
  },
  register: {
    title: "Create an account",
    submit: "Create account",
    haveAccount: "Already have an account?",
    login: "Login",
    errEmpty: "Please fill in all fields",
    errPasswordShort: "Password must be at least 6 characters",
    errMismatch: "Passwords do not match",
    success: "Registration successful! Please log in",
  },
  dashboard: {
    welcome: "Welcome,",
    guest: "Guest",
    subtitle: "Here's what's happening at your showroom today",
    periodAria: "Select period",
    search: "Search cars, customers...",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",
  },
  menu: {
    dashboard: "Dashboard",
    cars: "Cars",
    orders: "Orders",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings",
    support: "Support",
    logout: "Logout",
  },
  stats: {
    carsInStock: "Cars in stock",
    sold: "Cars sold",
    revenue: "Revenue",
    newCustomers: "New customers",
    carsUnit: "cars",
    peopleUnit: "people",
    vsLastMonth: "vs last month",
  },
  chart: {
    title: "Sales Overview",
    sales: "Sales",
  },
  topCars: {
    title: "Top Selling Cars",
    sedan: "Sedan",
    suv: "SUV",
    pickup: "Pickup",
    sold: "Sold",
    stock: "Stock",
  },
  orders: {
    title: "Orders",
    empty: "No orders in this period",
    seeAll: "See all",
    order: "Order",
    customer: "Customer",
    car: "Car",
    date: "Date",
    price: "Price",
    status: "Status",
    paid: "Paid",
    pending: "Pending",
  },
  periods: { day: "Day", week: "Week", month: "Month", year: "Year" },
  periodRange: { day: "Today", week: "Last 7 days", month: "Last 4 weeks", year: "Last 12 months" },
  vsPrevious: {
    day: "vs yesterday",
    week: "vs previous 7 days",
    month: "vs previous 4 weeks",
    year: "vs previous year",
  },
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  // ພາສາອັງກິດ: ຂໍ້ມູນເປັນພາສາອັງກິດຢູ່ແລ້ວ ບໍ່ຕ້ອງແປ (object ວ່າງ)
  chartLabels: {},
};

// ລວມທັງ 2 ພາສາ: translations["lo"] ຫຼື translations["en"]
export const translations: Record<Lang, Translation> = { lo, en };

// ---------- ຟັງຊັນຊ່ວຍ ----------

// ແປປ້າຍກຣາຟ: ຖ້າມີໃນຕາຕະລາງ chartLabels ໃຊ້ຄຳແປ, ຖ້າບໍ່ມີ ໃຊ້ຄຳເດີມ
// "??" = ຖ້າທາງຊ້າຍບໍ່ມີຄ່າ (undefined) ໃຫ້ໃຊ້ທາງຂວາ
export function translateLabel(t: Translation, label: string): string {
  return t.chartLabels[label] ?? label;
}

// ສະແດງວັນທີ: "2026-11-17" → "17 ພະຈິກ 2026" (ລາວ) ຫຼື "17 Nov 2026" (ອັງກິດ)
export function formatDate(t: Translation, isoDate: string): string {
  // split("-") = ຕັດຂໍ້ຄວາມຕາມເຄື່ອງໝາຍ "-" → ["2026", "11", "17"]
  const [year, month, day] = isoDate.split("-");
  // Number("11") = 11, ແຕ່ array ເລີ່ມນັບຈາກ 0 ຈຶ່ງຕ້ອງ -1
  return `${Number(day)} ${t.months[Number(month) - 1]} ${year}`;
}
