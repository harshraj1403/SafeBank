// the components made here will be reflected in all pages

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import MobileNav from "@/components/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";


export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //  const loggedIn= await getLoggedInUser();
    const loggedIn={
        firstName:'Harsh', lastName:'Raj', email:'raj1703@gmail.com'
    }
  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar  
        user={loggedIn}
        />
        
        <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>

            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}