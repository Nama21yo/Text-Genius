import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideNav from "./side-nav";

const MobileNav = () => {
  return (
    <div>
      <div className="px-4 bg-slate-50 dark:bg-slate-900">
        <Sheet>
          <SheetTrigger>
            <button className="p-2">
              <Menu size={30} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <div className="mt-5"></div>
            <SideNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;
