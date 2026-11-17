// =====================================================================
// ໜ້າ Dashboard (URL: /dashboard)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ສະແດງພາບລວມຂໍ້ມູນ ຫຼັງຈາກ Login ສຳເລັດ
//   1. ຫົວຂໍ້ + ປຸ່ມ Logout
//   2. ກາດສະຖິຕິ 4 ອັນ
//   3. ຕາຕະລາງ Order ລ່າສຸດ
// ໝາຍເຫດ: ໄຟລ໌ນີ້ບໍ່ມີ "use client" ເພາະບໍ່ມີ useState ຫຼື onClick
//          ຈຶ່ງເປັນ Server Component (ສ້າງໜ້າຢູ່ server ແລ້ວສົ່ງມາ, ໂຫຼດໄວກວ່າ)
// =====================================================================

// ---------- ສ່ວນ import ----------
import Link from "next/link"; // ລິ້ງໄປໜ້າອື່ນ
// buttonVariants = ຊຸດ class ຂອງປຸ່ມ, ໃຊ້ເພື່ອໃຫ້ Link ໜ້າຕາຄືປຸ່ມ
import { buttonVariants } from "@/components/ui/button";
// ປຸ່ມ dark mode (ເປັນ Client Component ແຕ່ເອົາມາໃຊ້ໃນ Server Component ໄດ້)
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ---------- ຂໍ້ມູນຕົວຢ່າງ (ສົມມຸດ) ----------
// array = ລາຍການຂໍ້ມູນ [ ... ], ແຕ່ລະອັນເປັນ object { key: value }
// ໃນວຽກແທ້ ຂໍ້ມູນເຫຼົ່ານີ້ຈະມາຈາກ database ຫຼື API

// ຂໍ້ມູນສຳລັບກາດສະຖິຕິ: title = ຊື່, value = ຕົວເລກ, note = ໝາຍເຫດ
const stats = [
  { title: "Users", value: "1,250", note: "+12% ຈາກເດືອນແລ້ວ" },
  { title: "Orders", value: "320", note: "+5% ຈາກເດືອນແລ້ວ" },
  { title: "Revenue", value: "$8,400", note: "+18% ຈາກເດືອນແລ້ວ" },
  { title: "Visitors", value: "5,600", note: "-3% ຈາກເດືອນແລ້ວ" },
];

// ຂໍ້ມູນສຳລັບຕາຕະລາງ Order
const recentOrders = [
  { id: "#1001", customer: "Somchai", amount: "$120", status: "ສຳເລັດ" },
  { id: "#1002", customer: "Noy", amount: "$75", status: "ກຳລັງສົ່ງ" },
  { id: "#1003", customer: "Kham", amount: "$210", status: "ສຳເລັດ" },
  { id: "#1004", customer: "Vanh", amount: "$48", status: "ລໍຖ້າ" },
];

// ---------- Component ຫຼັກຂອງໜ້າ ----------
export default function DashboardPage() {
  return (
    // mx-auto = ຈັດໄວ້ກາງ, max-w-5xl = ກວ້າງສູງສຸດ, p-6 = ໄລຍະຫ່າງຂອບ
    <main className="mx-auto w-full max-w-5xl flex-1 p-6">
      {/* ===== ສ່ວນທີ 1: ຫົວຂໍ້ + ປຸ່ມ Logout =====
          justify-between = ຫົວຂໍ້ຢູ່ຊ້າຍ, ປຸ່ມຢູ່ຂວາ */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">ຍິນດີຕ້ອນຮັບກັບມາ 👋</p>
        </div>
        {/* ປຸ່ມດ້ານຂວາ: dark mode + Logout ວາງຄຽງກັນ (gap-2 = ຫ່າງກັນໜ້ອຍໜຶ່ງ) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* ປຸ່ມ Logout: ເປັນ Link ໄປໜ້າ /login, ໃຊ້ buttonVariants ໃຫ້ເບິ່ງຄືປຸ່ມແບບ outline */}
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>
            Logout
          </Link>
        </div>
      </div>

      {/* ===== ສ່ວນທີ 2: ກາດສະຖິຕິ =====
          grid = ຈັດເປັນຕາຕະລາງ:
            - ມືຖື: 1 ຖັນ
            - sm:grid-cols-2 = ຈໍຂະໜາດກາງ: 2 ຖັນ
            - lg:grid-cols-4 = ຈໍໃຫຍ່: 4 ຖັນ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* .map() = ວົນຊ້ຳທຸກລາຍການໃນ array stats ແລ້ວສ້າງ Card ໃຫ້ແຕ່ລະອັນ
            item = ລາຍການປັດຈຸບັນໃນແຕ່ລະຮອບ
            key = ຄ່າບໍ່ຊ້ຳກັນ ທີ່ React ຕ້ອງການເມື່ອສ້າງລາຍການດ້ວຍ .map() */}
        {stats.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== ສ່ວນທີ 3: ຕາຕະລາງ Order ລ່າສຸດ ===== */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order ລ່າສຸດ</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <table> = ຕາຕະລາງ HTML
              <thead> = ແຖວຫົວຕາຕະລາງ, <tbody> = ເນື້ອໃນ
              <tr> = 1 ແຖວ, <th> = ຫ້ອງຫົວຂໍ້, <td> = ຫ້ອງຂໍ້ມູນ */}
          <table className="w-full text-sm">
            <thead>
              {/* border-b = ເສັ້ນຂອບລຸ່ມ, text-left = ຈັດຕົວໜັງສືຊ້າຍ */}
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2">ID</th>
                <th className="py-2">ລູກຄ້າ</th>
                <th className="py-2">ລາຄາ</th>
                <th className="py-2">ສະຖານະ</th>
              </tr>
            </thead>
            <tbody>
              {/* ວົນສ້າງແຖວຈາກ array recentOrders (ຄືກັບກາດຂ້າງເທິງ)
                  last:border-0 = ແຖວສຸດທ້າຍບໍ່ມີເສັ້ນຂອບລຸ່ມ */}
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.amount}</td>
                  <td className="py-2">
                    {/* ປ້າຍສະຖານະ: rounded-full = ມົນເປັນເມັດຢາ, bg-secondary = ພື້ນສີເທົາອ່ອນ */}
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
