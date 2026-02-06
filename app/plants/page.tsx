import InventoryTable from "@/components/InventoryTable";
import { auth } from "@/lib/auth"; // Konfigurasi server auth
import { headers } from "next/headers";
import { LoginModal } from "@/components/LoginModal";

export default async function PlantPage() {
  // 1. Cek session di sisi Server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      {session ? (
        /* KONDISI: SUDAH LOGIN */
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable  />
          </div>
        </div>
      ) : (
        /* KONDISI: BELUM LOGIN */
        <div className="flex justify-center mt-20 items-center">
          <LoginModal/>
        </div>
      )}
    </>
  );
}