// =====================================================================
// ບັນທຶກ ແລະອ່ານຂໍ້ມູນຜູ້ໃຊ້ ໃນ localStorage
// ---------------------------------------------------------------------
// localStorage = ບ່ອນເກັບຂໍ້ມູນນ້ອຍໆໃນ browser (ຂໍ້ມູນບໍ່ຫາຍເມື່ອ refresh)
// ໄຟລ໌ນີ້ເກັບ 2 ຢ່າງ:
//   1. "user"     = ຂໍ້ມູນບັນຊີ (ຊື່, email, password) ບັນທຶກຕອນ Register
//   2. "loggedIn" = ສະຖານະວ່າ Login ຢູ່ບໍ່ ("true" = Login ຢູ່)
// ⚠️ ໝາຍເຫດ: ນີ້ແມ່ນວິທີງ່າຍສຳລັບການຮຽນເທົ່ານັ້ນ!
//    ເວັບແທ້ຕ້ອງເກັບໃນ database ທີ່ server ແລະຫ້າມເກັບ password ແບບນີ້
//    (ໃຜເປີດ browser ນີ້ກໍເບິ່ງ password ໄດ້)
// =====================================================================

// ຂໍ້ມູນຜູ້ໃຊ້ທີ່ເຮົາເກັບ
export type User = {
  name: string;
  email: string;
  password: string;
};

// ຊື່ key ທີ່ໃຊ້ເກັບໃນ localStorage
const STORAGE_KEY = "user";
const LOGGED_IN_KEY = "loggedIn";

// ບັນທຶກຂໍ້ມູນຜູ້ໃຊ້ (ເອີ້ນໃຊ້ຕອນ Register ສຳເລັດ)
export function saveUser(user: User) {
  // localStorage ເກັບໄດ້ແຕ່ຂໍ້ຄວາມ (string)
  // ຈຶ່ງຕ້ອງໃຊ້ JSON.stringify ແປງ object ເປັນຂໍ້ຄວາມກ່ອນ
  // ຕົວຢ່າງ: { name: "Noy" } → '{"name":"Noy"}'
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// ອ່ານຂໍ້ມູນຜູ້ໃຊ້ (ເອີ້ນໃຊ້ໃນໜ້າ Login ແລະ Dashboard)
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

// ຈື່ວ່າ Login ແລ້ວ (ເອີ້ນໃຊ້ຕອນ Login ສຳເລັດ)
export function setLoggedIn() {
  localStorage.setItem(LOGGED_IN_KEY, "true");
}

// ກວດວ່າ Login ຢູ່ບໍ່ (ເອີ້ນໃຊ້ໃນໜ້າ Dashboard)
export function isLoggedIn(): boolean {
  return localStorage.getItem(LOGGED_IN_KEY) === "true";
}

// ອອກຈາກລະບົບ: ລຶບສະຖານະ Login (ແຕ່ບັນຊີຍັງຢູ່ ເພື່ອ Login ຄືນໄດ້)
export function logout() {
  localStorage.removeItem(LOGGED_IN_KEY);
}
