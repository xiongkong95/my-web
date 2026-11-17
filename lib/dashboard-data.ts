// =====================================================================
// ຂໍ້ມູນສົມມຸດ (mock data) ສຳລັບໜ້າ Dashboard ຂອງຮ້ານ Moora Auto Service
// ---------------------------------------------------------------------
// ໃນວຽກແທ້ ຂໍ້ມູນເຫຼົ່ານີ້ຈະມາຈາກ database ຫຼື API
// ແຍກໄວ້ໄຟລ໌ດຽວ ເພື່ອໃຫ້ component ສະແດງຜົນຢ່າງດຽວ ແລະແກ້ຂໍ້ມູນງ່າຍ
// ລາຄາທັງໝົດເກັບເປັນ ໂດລາ ($) ແລ້ວແປງເປັນ ກີບ (₭) ຕອນສະແດງ
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

// ---------- ກາດສະຖິຕິ 4 ອັນ ----------
// change = ປ່ຽນແປງທຽບກັບເດືອນກ່ອນເປັນ % (ບວກ = ເພີ່ມຂຶ້ນ, ລົບ = ຫຼຸດລົງ)
export const stats = {
  carsInStock: { value: 48, change: -6.3 }, // ລົດໃນສາງ (ຄັນ)
  soldThisMonth: { value: 12, change: 20.0 }, // ຂາຍໄດ້ເດືອນນີ້ (ຄັນ)
  revenue: { value: 386500, change: 14.2 }, // ລາຍຮັບເດືອນນີ້ (ໂດລາ)
  newCustomers: { value: 27, change: 8.0 }, // ລູກຄ້າໃໝ່ (ຄົນ)
};

// ---------- ປະເພດຂໍ້ມູນ (type) ----------
// type = ກຳນົດວ່າ object ຕ້ອງມີ key ຫຍັງແດ່ ແລະແຕ່ລະ key ເປັນຂໍ້ມູນປະເພດໃດ
// ຊ່ວຍໃຫ້ VS Code ແຈ້ງເຕືອນ ຖ້າເຮົາພິມຊື່ key ຜິດ
export type CarModel = {
  name: string; // ຊື່ລຸ້ນ
  year: number; // ປີ
  price: number; // ລາຄາ (ໂດລາ)
  sold: number; // ຂາຍໄດ້ແລ້ວ (ຄັນ)
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
    { name: "Toyota Camry", year: 2025, price: 38500, sold: 9, stock: 4, image: "/cars/camry.jpg" },
    { name: "Honda Civic", year: 2025, price: 31200, sold: 7, stock: 6, image: "/cars/civic.jpg" },
    { name: "Mazda 3", year: 2024, price: 27900, sold: 5, stock: 3, image: "/cars/mazda3.jpg" },
  ],
  suv: [
    { name: "Toyota Fortuner", year: 2025, price: 52800, sold: 11, stock: 5, image: "/cars/fortuner.jpg" },
    { name: "Ford Everest", year: 2025, price: 49500, sold: 8, stock: 2, image: "/cars/everest.jpg" },
    { name: "Hyundai Santa Fe", year: 2024, price: 44900, sold: 6, stock: 4, image: "/cars/santafe.jpg" },
  ],
  pickup: [
    { name: "Toyota Hilux Revo", year: 2025, price: 33800, sold: 15, stock: 9, image: "/cars/hilux.jpg" },
    { name: "Ford Ranger", year: 2025, price: 35200, sold: 12, stock: 7, image: "/cars/ranger.jpg" },
    { name: "Isuzu D-Max", year: 2024, price: 29600, sold: 10, stock: 8, image: "/cars/dmax.jpg" },
  ],
};

// ---------- ລາຍການສັ່ງຊື້ລ່າສຸດ ----------
// status: "paid" = ຈ່າຍແລ້ວ, "pending" = ລໍຖ້າຈ່າຍ
export type Order = {
  id: string; // ເລກທີສັ່ງຊື້
  customer: string; // ຊື່ລູກຄ້າ
  car: string; // ລົດທີ່ສັ່ງ
  price: number; // ລາຄາ (ໂດລາ)
  date: string; // ວັນທີ ແບບ "ປີ-ເດືອນ-ວັນ" ເຊັ່ນ "2026-11-17" (ສະແດງຕາມພາສາດ້ວຍ formatDate)
  status: "paid" | "pending";
};

export const recentOrders: Order[] = [
  { id: "#1042", customer: "Somchai Phommavong", car: "Toyota Fortuner", price: 52800, date: "2026-11-17", status: "paid" },
  { id: "#1041", customer: "Noy Sisouphanh", car: "Honda Civic", price: 31200, date: "2026-11-16", status: "pending" },
  { id: "#1040", customer: "Khamla Vongsa", car: "Toyota Hilux Revo", price: 33800, date: "2026-11-15", status: "paid" },
  { id: "#1039", customer: "Bounmy Keomany", car: "Ford Ranger", price: 35200, date: "2026-11-14", status: "paid" },
  { id: "#1038", customer: "Vilay Inthavong", car: "Mazda 3", price: 27900, date: "2026-11-12", status: "pending" },
];

// ---------- ກຣາຟຍອດຂາຍ ----------
// ແຕ່ລະຊ່ວງເວລາມີ array ຂອງຈຸດ: label = ປ້າຍແກນລຸ່ມ, value = ຍອດຂາຍ (ໂດລາ)
export type ChartRange = "1W" | "1M" | "6M" | "1Y";

export const sales: Record<ChartRange, { label: string; value: number }[]> = {
  "1W": [
    { label: "Mon", value: 33800 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 64400 },
    { label: "Thu", value: 35200 },
    { label: "Fri", value: 52800 },
    { label: "Sat", value: 86600 },
    { label: "Sun", value: 31200 },
  ],
  "1M": [
    { label: "Week 1", value: 72400 },
    { label: "Week 2", value: 98600 },
    { label: "Week 3", value: 115300 },
    { label: "Week 4", value: 100200 },
  ],
  "6M": [
    { label: "Jun", value: 248000 },
    { label: "Jul", value: 291500 },
    { label: "Aug", value: 265300 },
    { label: "Sep", value: 312800 },
    { label: "Oct", value: 338400 },
    { label: "Nov", value: 386500 },
  ],
  "1Y": [
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
