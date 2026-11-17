# my-web

ໂປຣເຈັກວຽກບ້ານ: ໜ້າ **Login**, **Register** ແລະ **Dashboard** ສ້າງດ້ວຍ Next.js + shadcn/ui

## ✨ ສິ່ງທີ່ມີ

- **Login** (`/login`): ເບີໂທ + Password ຫຼື Google
- **Register** (`/register`): ຟອມ Name, Phone number, Password, Confirm password ພ້ອມກວດຂໍ້ມູນ
- **Dashboard** (`/dashboard`): ພາບລວມການລົງທຶນ: ແຖບເມນູ, Watchlist, Portfolio ແລະກຣາຟ (shadcn Chart)
- **Theme ຂອງຕົນເອງ**: ສີທອງ (ແກ້ `--primary` ແລະ `--radius` ໃນ `app/globals.css`)
- **Dark mode**: ກົດປຸ່ມ 🌙 ຢູ່ມຸມຂວາເທິງ

> ໝາຍເຫດ: Login/Register ເປັນການຈຳລອງ ບໍ່ໄດ້ເຊື່ອມກັບ database

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

## 📁 ໂຄງສ້າງໄຟລ໌

```
app/
├── page.tsx            → redirect ໄປ /login
├── login/page.tsx      → ໜ້າ Login
├── register/page.tsx   → ໜ້າ Register
├── dashboard/page.tsx  → ໜ້າ Dashboard
├── layout.tsx          → layout ຫຼັກ + ປຸ່ມ dark mode
└── globals.css         → ສີ theme
components/
├── ui/                 → components ຂອງ shadcn
├── dashboard/          → ສ່ວນຕ່າງໆຂອງໜ້າ Dashboard (sidebar, header, ກາດ, ກຣາຟ)
├── auth-shell.tsx      → ໂຄງຮ່າງຮ່ວມຂອງໜ້າ Login/Register
├── google-button.tsx   → ເສັ້ນແບ່ງ + ປຸ່ມ Google
├── icons.tsx           → ໂລໂກ້ ແລະໄອຄອນ SVG
└── theme-toggle.tsx    → ປຸ່ມສະຫຼັບ dark mode
lib/
├── phone.ts            → ຟັງຊັນກວດເບີໂທລາວ
├── user.ts             → ບັນທຶກ/ອ່ານຊື່ຜູ້ໃຊ້ໃນ localStorage
└── dashboard-data.ts   → ຂໍ້ມູນສົມມຸດຂອງ Dashboard
```
