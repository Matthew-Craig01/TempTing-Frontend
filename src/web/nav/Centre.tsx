import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { TemplatesMenu } from "./TemplatesMenu";
import HelpMenu from "./HelpMenu";
import { AccountMenu } from "./AccountMenu";
import { useSize } from "@web/effects";

export const Centre = () => {
  let size = useSize();
  return (
    <NavigationMenu className="text-foreground">
      <NavigationMenuList
        aria-orientation={size.width <= 320 ? "vertical" : "horizontal"}
      >
        <TemplatesMenu></TemplatesMenu>
        {/* <HelpMenu></HelpMenu> */}
        <AccountMenu></AccountMenu>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Centre;
