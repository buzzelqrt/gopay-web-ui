# GoPay Bill - Frontend (Vercel)

Frontend Dashboard Web untuk GoPay Bill QRIS Dinamis & Manajemen Merchant.
Folder ini siap dideploy ke **Vercel** dengan backend yang tetap berjalan di VPS (`https://buzzel.dpdns.org`).

---

## 🚀 Cara Deploy ke Vercel via GitHub

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori, misalnya: `gopay-web-ui`.
3. Pilih **Public** atau **Private**, lalu klik **Create repository**.

### Langkah 2: Upload / Push Kode Frontend ke GitHub
Di terminal atau Git local Anda (atau langsung di VPS):
```bash
cd /root/gopay-web/frontend
git init
git add .
git commit -m "feat: init frontend UI for Vercel"
git branch -M main
git remote add origin https://github.com/<USERNAME-ANDA>/gopay-web-ui.git
git push -u origin main
```
*(Atau Anda bisa mengunduh file `index.html`, `app.css`, `app.js`, dan `vercel.json` lalu upload langsung ke GitHub via browser).*

### Langkah 3: Hubungkan ke Vercel
1. Buka [vercel.com/new](https://vercel.com/new).
2. Login dengan akun GitHub Anda.
3. Klik **Import** pada repositori `gopay-web-ui`.
4. Pada bagian **Build and Output Settings**, biarkan default (Framework Preset: **Other**).
5. Klik **Deploy**.

---

## 🔄 Fitur Auto-Update
Setelah terhubung ke Vercel:
- Setiap kali Anda melakukan perubahan kode di file UI (`index.html`, `app.css`, `app.js`) dan melakukan `git push` ke GitHub, Vercel akan **otomatis melakukan build & deploy ulang** dalam hitungan detik.

---

## ⚡ Cara Kerja Proxy / Rewrites
File `vercel.json` sudah otomatis mengarahkan semua panggilan API:
- `/api/*` ➡️ `https://buzzel.dpdns.org/api/*`
- `/join/*` ➡️ `https://buzzel.dpdns.org/join/*`

Sehingga browser tidak akan mengalami masalah CORS dan cookie sesi (`gp_profile`, `gp_session`) otomatis bekerja 100% tanpa hambatan.
