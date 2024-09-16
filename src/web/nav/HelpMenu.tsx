import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  ListItem,
} from "@/components/ui/navigation-menu";

export const HelpMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Help</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          <ListItem href="/templates/create" title="What are templates?">
            Introduction for new users.
          </ListItem>
          <ListItem href="/templates/create" title="Template Cheat Sheet">
            Quick reference for template syntax.
          </ListItem>
          <ListItem href="/templates/mine" title="About"></ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default HelpMenu;
