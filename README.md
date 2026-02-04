This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More



## Berikut adalah daftar package dan library yang diinstal dalam project ini untuk referensi pengembangan:
```bash
npx shadcn@latest init 
npx shadcn@latest add alert-dialog badge button card combobox command dialog input label popover skeleton table textarea
npm i next-themes           -> dark & light mode



```

# Cara menghubungkan Next.JS ke Neon melalui ORM Prisma
```bash
npm install -D prisma
npm install @prisma/client
npx prisma init

ambil DATABASE_URL=postgresql       = di website Neon, pilih prisma
npm install better-auth
ambil better-auth SECRET dan URL di website better-auth nya

buat file lib/auth.ts               = ambil code di web better-auth prisma
npx prisma generate	                = untuk PrismaClient "hapus import lama & ganti ctrl + space"
buath file lib/prisma.ts            = ambil code di medium ini
https://ckriswinarto.medium.com/using-prisma-orm-v7-in-a-next-js-app-simple-beginner-guide-fe3a65ed727a
npm install @prisma/adapter-pg  

hapus const prisma yg ada di auth.ts lalu panggil import prisma.ts
npx @better-auth/cli generate       = langsung menyediakan model account DLL di schema
npx prisma generate                 = jika schema.prisma sudah terisi
npx prisma db push                  = check tables neon apakah sudah masuk


## auth github
-> file auth.ts "ambil code di better-auth"
socialProviders: { 
  github: { 
    clientId: process.env.GITHUB_CLIENT_ID as string, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
  },
},
-> ambil GITHUB CLIENT ID DAN SECRET "taro di .env"
-> copy api/auth/[...all]/route.ts ambil di website better-auth "7 Mount Handler"
-> auth-client.ts   = buat file ini dan ambil juga kode nya
-> NEXT_PUBLIC_API_BASE_URL=http://localhost:3000   = tambahkan di .env
-> baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",    = tambahkan di auth-client.ts

```

# Konfigurasi Membuat Authentikasi Login
```bash
npm install react-hook-form @hookform/resolvers zod 
```