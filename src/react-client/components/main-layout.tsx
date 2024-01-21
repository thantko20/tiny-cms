import { Boxes, Image as ImageIcon, KeySquare } from "lucide-react";
import { Nav, NavLink } from "./nav";
import { Outlet, useMatchRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils/cn";
import { CollectionsNav } from "./collections-nav";

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

const collections = [
  {
    title: "Blogs",
    to: "/collections/blogs"
  },
  {
    title: "Authors",
    to: "/collections/authors"
  }
];

export const MainLayout = () => {
  const matchRoute = useMatchRoute();
  const isCollectionsRoute = matchRoute({ to: "/" });

  return (
    <div className="h-screen grid grid-cols-[250px_250px_1fr]">
      <div className="border-r border-solid border-gray-300 dark:border-gray-700">
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
      {isCollectionsRoute ? (
        <div className="border-r border-solid border-gray-300 dark:border-gray-700">
          <CollectionsNav links={collections} />
        </div>
      ) : null}
      <main
        className={cn("p-4 col-span-2", isCollectionsRoute && "col-span-1")}
      >
        <Outlet />
      </main>
    </div>
  );
};
