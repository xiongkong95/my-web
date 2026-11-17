// =====================================================================
// ຂໍ້ມູນສົມມຸດ (mock data) ສຳລັບໜ້າ Dashboard ຂອງຮ້ານ Moora Auto Service
// ---------------------------------------------------------------------
// ໃນວຽກແທ້ ຂໍ້ມູນເຫຼົ່ານີ້ຈະມາຈາກ database ຫຼື API
// ແຍກໄວ້ໄຟລ໌ດຽວ ເພື່ອໃຫ້ component ສະແດງຜົນຢ່າງດຽວ ແລະແກ້ຂໍ້ມູນງ່າຍ
// ລາຄາທັງໝົດເກັບເປັນ ໂດລາ ($) ແລ້ວແປງເປັນ ກີບ (₭) ຕອນສະແດງ
//
// ຂໍ້ມູນແບ່ງຕາມ 4 ຊ່ວງເວລາ (ປຸ່ມ ມື້ / ອາທິດ / ເດືອນ / ປີ):
//   day   = ມື້ນີ້ (17/11/2026)
//   week  = 7 ວັນລ່າສຸດ (11 – 17/11/2026)
//   month = 4 ອາທິດລ່າສຸດ (21/10 – 17/11/2026)
//   year  = 12 ເດືອນລ່າສຸດ (ທັນວາ 2025 – ພະຈິກ 2026)
// =====================================================================

// ---------- ອັດຕາແລກປ່ຽນ ----------
// 1 ໂດລາ = 21,500 ກີບ (ເປັນຕົວເລກສົມມຸດ, ແກ້ບ່ອນນີ້ບ່ອນດຽວ ທຸກໜ້າຈະປ່ຽນຕາມ)
export const KIP_PER_USD = 21500;

// ---------- ຟັງຊັນສະແດງລາຄາ ----------
// toLocaleString("en-US") = ໃສ່ຈຸດຂັ້ນຫຼັກພັນ ເຊັ່ນ 32500 → "32,500"

// ສະແດງເປັນໂດລາ: 32500 → "$32,500"
export function formatUSD(usd: number): string {
  return "$" + usd.toLocaleString("en-US");
}

// ແປງໂດລາເປັນກີບ ແລ້ວສະແດງ: 32500 → "698,750,000 ₭"
// Math.round = ປັດໃຫ້ເປັນຈຳນວນເຕັມ
export function formatKip(usd: number): string {
  return Math.round(usd * KIP_PER_USD).toLocaleString("en-US") + " ₭";
}

// ສະແດງກີບແບບສັ້ນ ສຳລັບຕົວເລກໃຫຍ່ຫຼາຍ: 386500 → "8.31B ₭"
// notation: "compact" = ຫຍໍ້ຕົວເລກ (K = ພັນ, M = ລ້ານ, B = ຕື້)
export function formatKipShort(usd: number): string {
  const kip = usd * KIP_PER_USD;
  return kip.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 }) + " ₭";
}

// ---------- ຊ່ວງເວລາ ----------
export type Period = "day" | "week" | "month" | "year";

// ລາຍການປຸ່ມ ລຽງຕາມລຳດັບທີ່ສະແດງ
export const periods: Period[] = ["day", "week", "month", "year"];

// ວັນທີ "ມື້ນີ້" ຂອງຂໍ້ມູນສົມມຸດ (ໃຊ້ກັ່ນຕອງລາຍການສັ່ງຊື້)
export const TODAY = "2026-11-17";

// ---------- ກຣາຟຍອດຂາຍ ----------
// ແຕ່ລະຊ່ວງເວລາມີ array ຂອງຈຸດ: label = ປ້າຍແກນລຸ່ມ, value = ຍອດຂາຍ (ໂດລາ)
// (ປ້າຍເປັນພາສາອັງກິດ ແລ້ວແປເປັນລາວໃນ lib/translations.ts → chartLabels)
export const sales: Record<Period, { label: string; value: number }[]> = {
  // ມື້ນີ້: ລາຍຊົ່ວໂມງ (ຂາຍໄດ້ 2 ຄັນ ຕອນ 10 ໂມງ ແລະ 14 ໂມງ)
  day: [
    { label: "08:00", value: 0 },
    { label: "09:00", value: 0 },
    { label: "10:00", value: 52800 },
    { label: "11:00", value: 0 },
    { label: "12:00", value: 0 },
    { label: "13:00", value: 0 },
    { label: "14:00", value: 31200 },
    { label: "15:00", value: 0 },
    { label: "16:00", value: 0 },
    { label: "17:00", value: 0 },
    { label: "18:00", value: 0 },
  ],
  // 7 ວັນລ່າສຸດ: ພຸດ 11 ຫາ ອັງຄານ 17 (ມື້ນີ້)
  week: [
    { label: "Wed", value: 0 },
    { label: "Thu", value: 27900 },
    { label: "Fri", value: 35200 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 33800 },
    { label: "Mon", value: 0 },
    { label: "Tue", value: 84000 },
  ],
  // 4 ອາທິດລ່າສຸດ
  month: [
    { label: "Week 1", value: 61800 },
    { label: "Week 2", value: 72400 },
    { label: "Week 3", value: 71400 },
    { label: "Week 4", value: 180900 },
  ],
  // 12 ເດືອນລ່າສຸດ
  year: [
    { label: "Dec", value: 205000 },
    { label: "Jan", value: 231400 },
    { label: "Feb", value: 198700 },
    { label: "Mar", value: 226900 },
    { label: "Apr", value: 259300 },
    { label: "May", value: 240100 },
    { label: "Jun", value: 248000 },
    { label: "Jul", value: 291500 },
    { label: "Aug", value: 265300 },
    { label: "Sep", value: 312800 },
    { label: "Oct", value: 338400 },
    { label: "Nov", value: 386500 },
  ],
};

// ລວມຍອດຂາຍຂອງຊ່ວງເວລາ (ໃຊ້ທັງໃນກາດລາຍຮັບ ແລະກຣາຟ ຕົວເລກຈະໄດ້ກົງກັນ)
// reduce = ບວກຄ່າທຸກຈຸດເຂົ້າກັນ (ເລີ່ມຈາກ 0)
export function totalSales(period: Period): number {
  return sales[period].reduce((sum, point) => sum + point.value, 0);
}

// ---------- ກາດສະຖິຕິ ----------
// ລົດໃນສາງ: ເປັນຈຳນວນຕອນນີ້ ບໍ່ປ່ຽນຕາມຊ່ວງເວລາ
export const carsInStock = { value: 48, change: -6.3 };

// ສະຖິຕິທີ່ປ່ຽນຕາມຊ່ວງເວລາ
// change = % ປ່ຽນແປງທຽບກັບຊ່ວງກ່ອນໜ້າ (ບວກ = ເພີ່ມຂຶ້ນ, ລົບ = ຫຼຸດລົງ)
// ລາຍຮັບ (value) ບໍ່ຕ້ອງເກັບ ເພາະຄິດໄລ່ຈາກ totalSales() ເອົາ
export const periodStats: Record<
  Period,
  { sold: number; soldChange: number; revenueChange: number; newCustomers: number; customersChange: number }
> = {
  day: { sold: 2, soldChange: 100, revenueChange: 75.0, newCustomers: 3, customersChange: 50.0 },
  week: { sold: 5, soldChange: 25.0, revenueChange: 18.4, newCustomers: 9, customersChange: 12.5 },
  month: { sold: 12, soldChange: 20.0, revenueChange: 14.2, newCustomers: 27, customersChange: 8.0 },
  year: { sold: 118, soldChange: 22.9, revenueChange: 27.6, newCustomers: 241, customersChange: 15.3 },
};

// ---------- ປະເພດຂໍ້ມູນ (type) ----------
// type = ກຳນົດວ່າ object ຕ້ອງມີ key ຫຍັງແດ່ ແລະແຕ່ລະ key ເປັນຂໍ້ມູນປະເພດໃດ
// ຊ່ວຍໃຫ້ VS Code ແຈ້ງເຕືອນ ຖ້າເຮົາພິມຊື່ key ຜິດ
export type CarModel = {
  name: string; // ຊື່ລຸ້ນ
  year: number; // ປີ
  price: number; // ລາຄາ (ໂດລາ)
  sold: Record<Period, number>; // ຂາຍໄດ້ (ຄັນ) ໃນແຕ່ລະຊ່ວງເວລາ
  stock: number; // ເຫຼືອໃນສາງ (ຄັນ)
  image: string; // ທີ່ຢູ່ຮູບ ໃນໂຟນເດີ public/ (ເຊັ່ນ "/cars/camry.jpg" = public/cars/camry.jpg)
};

// ປະເພດລົດ 3 ແບບ (ໃຊ້ເປັນແທັບ)
export type CarType = "sedan" | "suv" | "pickup";

// ---------- ລົດຂາຍດີ: ແບ່ງຕາມປະເພດ ----------
// 📷 ຮູບລົດ: ເອົາຮູບໃສ່ໃນໂຟນເດີ public/cars/ ໃຫ້ຊື່ໄຟລ໌ກົງກັບ image ຂ້າງລຸ່ມ
//    ຖ້າຍັງບໍ່ມີຮູບ ເວັບຈະສະແດງໄອຄອນລົດແທນ (ບໍ່ພັງ)
export const topCars: Record<CarType, CarModel[]> = {
  sedan: [
    { name: "Toyota Camry", year: 2025, price: 38500, sold: { day: 0, week: 0, month: 3, year: 28 }, stock: 4, image: "/cars/camry.jpg" },
    { name: "Honda Civic", year: 2025, price: 31200, sold: { day: 1, week: 1, month: 2, year: 24 }, stock: 6, image: "/cars/civic.jpg" },
    { name: "Mazda 3", year: 2024, price: 27900, sold: { day: 0, week: 1, month: 2, year: 17 }, stock: 3, image: "/cars/mazda3.jpg" },
  ],
  suv: [
    { name: "Toyota Fortuner", year: 2025, price: 52800, sold: { day: 1, week: 1, month: 4, year: 31 }, stock: 5, image: "/cars/fortuner.jpg" },
    { name: "Ford Everest", year: 2025, price: 49500, sold: { day: 0, week: 0, month: 2, year: 22 }, stock: 2, image: "/cars/everest.jpg" },
    { name: "Hyundai Santa Fe", year: 2024, price: 44900, sold: { day: 0, week: 0, month: 1, year: 15 }, stock: 4, image: "/cars/santafe.jpg" },
  ],
  pickup: [
    { name: "Toyota Hilux Revo", year: 2025, price: 33800, sold: { day: 0, week: 1, month: 5, year: 46 }, stock: 9, image: "/cars/hilux.jpg" },
    { name: "Ford Ranger", year: 2025, price: 35200, sold: { day: 0, week: 1, month: 4, year: 38 }, stock: 7, image: "/cars/ranger.jpg" },
    { name: "Isuzu D-Max", year: 2024, price: 29600, sold: { day: 0, week: 0, month: 3, year: 29 }, stock: 8, image: "/cars/dmax.jpg" },
  ],
};

// ---------- ລາຍການສັ່ງຊື້ ----------
// status: "paid" = ຈ່າຍແລ້ວ, "pending" = ລໍຖ້າຈ່າຍ
export type Order = {
  id: string; // ເລກທີສັ່ງຊື້
  customer: string; // ຊື່ລູກຄ້າ
  car: string; // ລົດທີ່ສັ່ງ
  price: number; // ລາຄາ (ໂດລາ)
  date: string; // ວັນທີ ແບບ "ປີ-ເດືອນ-ວັນ" ເຊັ່ນ "2026-11-17" (ສະແດງຕາມພາສາດ້ວຍ formatDate)
  status: "paid" | "pending";
};

// ລຽງຈາກໃໝ່ສຸດ → ເກົ່າສຸດ
export const orders: Order[] = [
  { id: "#1050", customer: "Somchai Phommavong", car: "Toyota Fortuner", price: 52800, date: "2026-11-17", status: "paid" },
  { id: "#1049", customer: "Noy Sisouphanh", car: "Honda Civic", price: 31200, date: "2026-11-17", status: "pending" },
  { id: "#1048", customer: "Khamla Vongsa", car: "Toyota Hilux Revo", price: 33800, date: "2026-11-15", status: "paid" },
  { id: "#1047", customer: "Bounmy Keomany", car: "Ford Ranger", price: 35200, date: "2026-11-13", status: "paid" },
  { id: "#1046", customer: "Vilay Inthavong", car: "Mazda 3", price: 27900, date: "2026-11-12", status: "pending" },
  { id: "#1045", customer: "Souksavanh Chanthavong", car: "Ford Everest", price: 49500, date: "2026-11-03", status: "paid" },
  { id: "#1044", customer: "Phonesavanh Sengdara", car: "Isuzu D-Max", price: 29600, date: "2026-10-28", status: "paid" },
  { id: "#1043", customer: "Kham Phengsy", car: "Toyota Camry", price: 38500, date: "2026-09-14", status: "paid" },
  { id: "#1042", customer: "Ketsana Vilaythong", car: "Hyundai Santa Fe", price: 44900, date: "2026-06-02", status: "paid" },
  { id: "#1041", customer: "Anousone Douangphachanh", car: "Toyota Hilux Revo", price: 33800, date: "2026-01-20", status: "paid" },
];

// ---------- ກັ່ນຕອງລາຍການສັ່ງຊື້ຕາມຊ່ວງເວລາ ----------

// ນັບວ່າວັນທີນີ້ ຫ່າງຈາກມື້ນີ້ (TODAY) ຈັກມື້: "2026-11-15" → 2
function daysAgo(isoDate: string): number {
  // Date.parse = ແປງວັນທີເປັນ ມິລລິວິນາທີ, ຫານດ້ວຍ (1000 × 60 × 60 × 24) = ຈຳນວນມື້
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((Date.parse(TODAY) - Date.parse(isoDate)) / oneDay);
}

// ຊ່ວງເວລານັບຍ້ອນຫຼັງໄດ້ສູງສຸດຈັກມື້ (0 = ມື້ນີ້ເທົ່ານັ້ນ)
const maxDaysAgo: Record<Period, number> = {
  day: 0,
  week: 6, // 7 ວັນ (ມື້ນີ້ + 6 ມື້ກ່ອນ)
  month: 27, // 4 ອາທິດ = 28 ວັນ
  year: 364, // 365 ວັນ
};

// ເອົາສະເພາະການສັ່ງຊື້ທີ່ຢູ່ໃນຊ່ວງເວລາທີ່ເລືອກ
// filter = ເກັບໄວ້ສະເພາະລາຍການທີ່ເງື່ອນໄຂເປັນ true
export function ordersInPeriod(period: Period): Order[] {
  return orders.filter((order) => daysAgo(order.date) <= maxDaysAgo[period]);
}
