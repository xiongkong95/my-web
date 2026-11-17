# my-web

ໂປຣເຈັກວຽກບ້ານ: ໜ້າ **Login**, **Register** ແລະ **Dashboard** ສ້າງດ້ວຍ Next.js + shadcn/ui

## ✨ ສິ່ງທີ່ມີ

- **Login** (`/login`): ຟອມ Email + Password
- **Register** (`/register`): ຟອມ Name, Email, Password, Confirm password ພ້ອມກວດຂໍ້ມູນ
- **Dashboard** (`/dashboard`): ກາດສະຖິຕິ ແລະຕາຕະລາງ Order
- **Theme ຂອງຕົນເອງ**: ສີເທົາ-ຂາວ (ແກ້ `--primary` ແລະ `--radius` ໃນ `app/globals.css`)
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
└── theme-toggle.tsx    → ປຸ່ມສະຫຼັບ dark mode
```
