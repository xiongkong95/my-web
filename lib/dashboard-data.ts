// =====================================================================
// ຂໍ້ມູນສົມມຸດ (mock data) ສຳລັບໜ້າ Dashboard
// ---------------------------------------------------------------------
// ໃນວຽກແທ້ ຂໍ້ມູນເຫຼົ່ານີ້ຈະມາຈາກ database ຫຼື API
// ແຍກໄວ້ໄຟລ໌ດຽວ ເພື່ອໃຫ້ component ສະແດງຜົນຢ່າງດຽວ ແລະແກ້ຂໍ້ມູນງ່າຍ
// =====================================================================

// ---------- ຍອດເງິນລວມ ----------
export const totalHolding = 12304.11;

// ---------- ປະເພດຂໍ້ມູນ (type) ----------
// type = ກຳນົດວ່າ object ຕ້ອງມີ key ຫຍັງແດ່ ແລະແຕ່ລະ key ເປັນຂໍ້ມູນປະເພດໃດ
// ຊ່ວຍໃຫ້ VS Code ແຈ້ງເຕືອນ ຖ້າເຮົາພິມຊື່ key ຜິດ
export type Stock = {
  name: string; // ຊື່ບໍລິສັດ
  ticker: string; // ຕົວຫຍໍ້ຫຸ້ນ ເຊັ່ນ AAPL
  exchange: string; // ຕະຫຼາດ ເຊັ່ນ NYSE
  price: number; // ລາຄາ
  changePercent: number; // ປ່ຽນແປງເປັນ % (ບວກ = ຂຶ້ນ, ລົບ = ລົງ)
};

// ---------- Watchlist: ແບ່ງເປັນ 3 ແທັບ ----------
export const watchlist: Record<"mostViewed" | "gain" | "lose", Stock[]> = {
  mostViewed: [
    { name: "Spotify", ticker: "SPOT", exchange: "NYSE", price: 11770.3, changePercent: 16.31 },
    { name: "Amazon", ticker: "AMZN", exchange: "NYSE", price: 10280.8, changePercent: 8.11 },
    { name: "Microsoft", ticker: "MSFT", exchange: "NYSE", price: 8510.2, changePercent: 4.89 },
    { name: "Nvidia", ticker: "NVDA", exchange: "NYSE", price: 2110.2, changePercent: 2.12 },
  ],
  gain: [
    { name: "Tesla", ticker: "TSLA", exchange: "NASDAQ", price: 4210.5, changePercent: 21.4 },
    { name: "Spotify", ticker: "SPOT", exchange: "NYSE", price: 11770.3, changePercent: 16.31 },
    { name: "Netflix", ticker: "NFLX", exchange: "NASDAQ", price: 6320.1, changePercent: 12.05 },
    { name: "Amazon", ticker: "AMZN", exchange: "NYSE", price: 10280.8, changePercent: 8.11 },
  ],
  lose: [
    { name: "Intel", ticker: "INTC", exchange: "NASDAQ", price: 310.4, changePercent: -9.82 },
    { name: "Disney", ticker: "DIS", exchange: "NYSE", price: 1120.7, changePercent: -5.36 },
    { name: "Nike", ticker: "NKE", exchange: "NYSE", price: 905.2, changePercent: -3.14 },
    { name: "Boeing", ticker: "BA", exchange: "NYSE", price: 1890.6, changePercent: -1.08 },
  ],
};

// ---------- My Portfolio: ຫຸ້ນທີ່ຖືຢູ່ ----------
export const portfolio = [
  { ticker: "AAPL", price: 1721.3, change: 12.31, changePercent: 0.7, units: 104 },
  { ticker: "AMZN", price: 1721.3, change: 12.31, changePercent: 0.7, units: 12 },
  { ticker: "MSFT", price: 1721.3, change: 12.31, changePercent: 0.7, units: 41 },
  { ticker: "NVDA", price: 1721.3, change: 12.31, changePercent: 0.7, units: 16 },
];

// ---------- Portfolio Performance: ຂໍ້ມູນກຣາຟ ----------
// ແຕ່ລະຊ່ວງເວລາ (1D, 1W, ...) ມີ array ຂອງຈຸດ: label = ປ້າຍແກນລຸ່ມ, value = ມູນຄ່າ
export type ChartRange = "1D" | "1W" | "1M" | "6M" | "1Y";

export const performance: Record<ChartRange, { label: string; value: number }[]> = {
  "1D": [
    { label: "09:00", value: 152000 },
    { label: "10:00", value: 154500 },
    { label: "11:00", value: 151200 },
    { label: "12:00", value: 156800 },
    { label: "13:00", value: 158100 },
    { label: "14:00", value: 155400 },
    { label: "15:00", value: 160200 },
    { label: "16:00", value: 162300 },
  ],
  "1W": [
    { label: "Mon", value: 148000 },
    { label: "Tue", value: 152300 },
    { label: "Wed", value: 149800 },
    { label: "Thu", value: 157200 },
    { label: "Fri", value: 161000 },
    { label: "Sat", value: 159400 },
    { label: "Sun", value: 162300 },
  ],
  "1M": [
    { label: "Week 1", value: 140500 },
    { label: "Week 2", value: 151800 },
    { label: "Week 3", value: 146200 },
    { label: "Week 4", value: 162300 },
  ],
  "6M": [
    { label: "Jul", value: 98000 },
    { label: "Aug", value: 135000 },
    { label: "Sep", value: 112000 },
    { label: "Oct", value: 101000 },
    { label: "Nov", value: 128000 },
    { label: "Dec", value: 162300 },
  ],
  "1Y": [
    { label: "Jan", value: 168000 },
    { label: "Feb", value: 142000 },
    { label: "Mar", value: 151000 },
    { label: "Apr", value: 128000 },
    { label: "May", value: 139000 },
    { label: "Jun", value: 116500 },
    { label: "Jul", value: 98000 },
    { label: "Aug", value: 135000 },
    { label: "Sep", value: 112000 },
    { label: "Oct", value: 101000 },
    { label: "Nov", value: 128000 },
    { label: "Dec", value: 162300 },
  ],
};

// ---------- ຟັງຊັນຊ່ວຍຈັດຮູບແບບຕົວເລກເປັນເງິນ ----------
// ຕົວຢ່າງ: formatMoney(12304.11) → "$12,304.11"
export function formatMoney(value: number): string {
  // toLocaleString = ໃສ່ເຄື່ອງໝາຍຈຸດ (,) ຂັ້ນຫຼັກພັນໃຫ້ອັດຕະໂນມັດ
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
