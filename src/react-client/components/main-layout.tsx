import { Boxes, Image as ImageIcon, KeySquare } from "lucide-react";
import { Nav, NavLink } from "./nav";
import { Outlet } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const links: NavLink[] = [
  {
    title: "Collections",
    icon: <Boxes size={20} />,
    to: "/"
  },
  {
    title: "Media Library",
    icon: <ImageIcon size={20} />,
    to: "/media"
  },
  {
    title: "API Keys",
    icon: <KeySquare size={20} />,
    to: "/api-keys"
  }
];

export const MainLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[250px_1fr]">
      <div className="border-r border-solid border-gray-300 dark:border-gray-600">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 px-4 py-1">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
            <p>Thant Ko Zaw</p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="px-4 py-2">
          <Nav links={links} />
        </div>
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
