import { redirect } from "next/navigation";

// ໜ້າທຳອິດ: ສົ່ງຜູ້ໃຊ້ໄປໜ້າ Login
export default function Home() {
  redirect("/login");
}
