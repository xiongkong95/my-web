# Moora Auto Service 🚗

ໂປຣເຈັກວຽກບ້ານ: ເວັບຮ້ານຂາຍລົດ ມີໜ້າ **Login**, **Register** ແລະ **Dashboard** ສ້າງດ້ວຍ Next.js + shadcn/ui

## ✨ ສິ່ງທີ່ມີ

- **Login** (`/login`): Email + Password (ກວດກັບບັນຊີທີ່ Register ໄວ້) ຫຼື Google
- **Register** (`/register`): ຟອມ Name, Email, Password, Confirm password ພ້ອມກວດຂໍ້ມູນ
- **Dashboard** (`/dashboard`): ພາບລວມຂອງຮ້ານ ສຳລັບເຈົ້າຂອງຮ້ານ: ກາດສະຖິຕິ (ລົດໃນສາງ, ຂາຍໄດ້, ລາຍຮັບ, ລູກຄ້າໃໝ່), ກຣາຟຍອດຂາຍ (shadcn Chart), ລົດຂາຍດີ ແລະລາຍການສັ່ງຊື້. ກົດປຸ່ມ **ມື້ / ອາທິດ / ເດືອນ / ປີ** ເພື່ອປ່ຽນຂໍ້ມູນທັງໜ້າ. ລາຄາສະແດງທັງ ກີບ (₭) ແລະ ໂດລາ ($). ຕ້ອງ Login ກ່ອນຈຶ່ງເຂົ້າໄດ້
- **Theme ຂອງຕົນເອງ**: ສີທອງ (ແກ້ `--primary` ແລະ `--radius` ໃນ `app/globals.css`)
- **Dark mode**: ກົດປຸ່ມ 🌙 ຢູ່ມຸມຂວາເທິງ
- **2 ພາສາ**: ພາສາລາວເປັນຫຼັກ, ກົດປຸ່ມ `EN` ເພື່ອປ່ຽນເປັນພາສາອັງກິດ (ກົດ `ລາວ` ເພື່ອປ່ຽນຄືນ). ເວັບຈະຈື່ພາສາທີ່ເລືອກໄວ້

## 🌐 ແກ້ຂໍ້ຄວາມ / ຄຳແປ

ຂໍ້ຄວາມທັງໝົດຂອງເວັບ (ທັງ 2 ພາສາ) ຢູ່ໃນໄຟລ໌ດຽວ: `lib/translations.ts`

- `lo` = ພາສາລາວ, `en` = ພາສາອັງກິດ
- ເພີ່ມຂໍ້ຄວາມໃໝ່: ເພີ່ມ key ດຽວກັນໃນທັງ `lo` ແລະ `en` (ຖ້າລືມ, TypeScript ຈະແຈ້ງ error)
- ຊື່ຮ້ານ, ຊື່ລຸ້ນລົດ ແລະຊື່ລູກຄ້າ ບໍ່ແປ

> ໝາຍເຫດ: Login/Register ເປັນການຈຳລອງ ເກັບຂໍ້ມູນໃນ localStorage ຂອງ browser ບໍ່ໄດ້ເຊື່ອມກັບ database
> (ເວັບແທ້ຫ້າມເກັບ password ແບບນີ້)

## 🛠️ ເຄື່ອງມືທີ່ໃຊ້

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🚀 ວິທີແລ່ນໃນເຄື່ອງ

```bash
npm install
npm run dev
```

ແລ້ວເປີດ [http://localhost:3000](http://localhost:3000)

## 📷 ໃສ່ຮູບລົດ

ສ້າງໂຟນເດີ `public/cars/` ແລ້ວໃສ່ຮູບລົດ ໃຫ້ຊື່ໄຟລ໌ກົງກັບລາຍການນີ້:

| ລົດ | ຊື່ໄຟລ໌ |
| --- | --- |
| Toyota Camry | `camry.jpg` |
| Honda Civic | `civic.jpg` |
| Mazda 3 | `mazda3.jpg` |
| Toyota Fortuner | `fortuner.jpg` |
| Ford Everest | `everest.jpg` |
| Hyundai Santa Fe | `santafe.jpg` |
| Toyota Hilux Revo | `hilux.jpg` |
| Ford Ranger | `ranger.jpg` |
| Isuzu D-Max | `dmax.jpg` |

- ຮູບແນວນອນ (ກວ້າງກວ່າສູງ) ຈະເບິ່ງງາມທີ່ສຸດ
- ຖ້າຍັງບໍ່ມີຮູບ ເວັບຈະສະແດງໄອຄອນລົດແທນ
- ຢາກປ່ຽນຊື່ໄຟລ໌ ຫຼືໃຊ້ `.png`: ແກ້ `image` ໃນ `lib/dashboard-data.ts`
- ອັດຕາແລກປ່ຽນ ($ → ₭) ແກ້ໄດ້ທີ່ `KIP_PER_USD` ໃນໄຟລ໌ດຽວກັນ

## 📁 ໂຄງສ້າງໄຟລ໌

```
app/
├── page.tsx            → redirect ໄປ /login
├── login/page.tsx      → ໜ້າ Login
├── register/page.tsx   → ໜ້າ Register
├── dashboard/page.tsx  → ໜ້າ Dashboard
├── layout.tsx          → layout ຫຼັກ + font ລາວ + ລະບົບພາສາ
└── globals.css         → ສີ theme
components/
├── ui/                 → components ຂອງ shadcn
├── dashboard/          → ສ່ວນຕ່າງໆຂອງໜ້າ Dashboard (dashboard-content = ເກັບຊ່ວງເວລາ, sidebar, header, ກາດສະຖິຕິ,
│                         ກຣາຟຍອດຂາຍ, ລົດຂາຍດີ, ລາຍການສັ່ງຊື້, ຮູບລົດ)
├── auth-shell.tsx      → ໂຄງຮ່າງຮ່ວມຂອງໜ້າ Login/Register
├── google-button.tsx   → ເສັ້ນແບ່ງ + ປຸ່ມ Google
├── language-provider.tsx → ລະບົບພາສາ (React Context + useLanguage)
├── language-toggle.tsx → ປຸ່ມສະຫຼັບພາສາ ລາວ/EN
├── icons.tsx           → ໂລໂກ້ລົດ ແລະໄອຄອນ SVG
└── theme-toggle.tsx    → ປຸ່ມສະຫຼັບ dark mode
lib/
├── email.ts            → ຟັງຊັນກວດ email
├── translations.ts     → ຂໍ້ຄວາມທັງໝົດ ພາສາລາວ + ອັງກິດ
├── user.ts             → ບັນທຶກ/ອ່ານບັນຊີ ແລະສະຖານະ Login ໃນ localStorage
└── dashboard-data.ts   → ຂໍ້ມູນສົມມຸດຂອງ Dashboard + ຟັງຊັນສະແດງລາຄາ ₭ / $
public/
└── cars/               → ຮູບລົດ (ເຈົ້າໃສ່ເອງ)
```
