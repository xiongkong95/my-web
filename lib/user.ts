// =====================================================================
// ບັນທຶກ ແລະອ່ານຂໍ້ມູນຜູ້ໃຊ້ ໃນ localStorage
// ---------------------------------------------------------------------
// localStorage = ບ່ອນເກັບຂໍ້ມູນນ້ອຍໆໃນ browser (ຂໍ້ມູນບໍ່ຫາຍເມື່ອ refresh)
// ໝາຍເຫດ: ນີ້ແມ່ນວິທີງ່າຍສຳລັບການຮຽນເທົ່ານັ້ນ, ເວັບແທ້ຕ້ອງເກັບໃນ database
// =====================================================================

// ຂໍ້ມູນຜູ້ໃຊ້ທີ່ເຮົາເກັບ
export type User = {
  name: string;
  phone: string;
};

// ຊື່ key ທີ່ໃຊ້ເກັບໃນ localStorage
const STORAGE_KEY = "user";

// ບັນທຶກຂໍ້ມູນຜູ້ໃຊ້ (ເອີ້ນໃຊ້ຕອນ Register ສຳເລັດ)
export function saveUser(user: User) {
  // localStorage ເກັບໄດ້ແຕ່ຂໍ້ຄວາມ (string)
  // ຈຶ່ງຕ້ອງໃຊ້ JSON.stringify ແປງ object ເປັນຂໍ້ຄວາມກ່ອນ
  // ຕົວຢ່າງ: { name: "Noy" } → '{"name":"Noy"}'
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// ອ່ານຂໍ້ມູນຜູ້ໃຊ້ (ເອີ້ນໃຊ້ໃນໜ້າ Dashboard)
// ສົ່ງຄືນ User ຖ້າມີ, ຫຼື null ຖ້າຍັງບໍ່ເຄີຍ Register
export function loadUser(): User | null {
  const text = localStorage.getItem(STORAGE_KEY);
  if (text === null) return null; // ຍັງບໍ່ມີຂໍ້ມູນ

  // JSON.parse = ແປງຂໍ້ຄວາມກັບເປັນ object
  // try/catch = ຖ້າຂໍ້ມູນເສຍຫາຍ ແປງບໍ່ໄດ້ ຈະບໍ່ໃຫ້ເວັບພັງ ແຕ່ສົ່ງຄືນ null ແທນ
  try {
    return JSON.parse(text) as User;
  } catch {
    return null;
  }
}
