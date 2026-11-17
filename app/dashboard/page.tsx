import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ຂໍ້ມູນຕົວຢ່າງ (ສົມມຸດ)
const stats = [
  { title: "Users", value: "1,250", note: "+12% ຈາກເດືອນແລ້ວ" },
  { title: "Orders", value: "320", note: "+5% ຈາກເດືອນແລ້ວ" },
  { title: "Revenue", value: "$8,400", note: "+18% ຈາກເດືອນແລ້ວ" },
  { title: "Visitors", value: "5,600", note: "-3% ຈາກເດືອນແລ້ວ" },
];

const recentOrders = [
  { id: "#1001", customer: "Somchai", amount: "$120", status: "ສຳເລັດ" },
  { id: "#1002", customer: "Noy", amount: "$75", status: "ກຳລັງສົ່ງ" },
  { id: "#1003", customer: "Kham", amount: "$210", status: "ສຳເລັດ" },
  { id: "#1004", customer: "Vanh", amount: "$48", status: "ລໍຖ້າ" },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 p-6 pt-20">
      {/* ຫົວຂໍ້ + ປຸ່ມ Logout */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">ຍິນດີຕ້ອນຮັບກັບມາ 👋</p>
        </div>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Logout
        </Link>
      </div>

      {/* ກາດສະຖິຕິ: ໃຊ້ .map() ວົນສ້າງກາດຈາກ array */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ຕາຕະລາງ Order ລ່າສຸດ */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order ລ່າສຸດ</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2">ID</th>
                <th className="py-2">ລູກຄ້າ</th>
                <th className="py-2">ລາຄາ</th>
                <th className="py-2">ສະຖານະ</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.amount}</td>
                  <td className="py-2">
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
