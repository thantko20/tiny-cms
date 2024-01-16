import { Link, RoutePaths } from "@tanstack/react-router";
import { ReactNode } from "react";
import { cn } from "../lib/utils/cn";
import { buttonVariants } from "./ui/button";
import { routeTree } from "../routes";

export type NavLink = {
  title: string;
  to: RoutePaths<typeof routeTree>;
  icon: ReactNode;
};

export const Nav = ({ links }: { links: NavLink[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.title}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex gap-2.5 items-center justify-start"
          )}
          to={link.to}
        >
          {link.icon}
          {link.title}
        </Link>
      ))}
    </div>
  );
};
