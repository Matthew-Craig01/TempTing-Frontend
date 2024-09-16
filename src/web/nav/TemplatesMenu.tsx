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

export const TemplatesMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          <li className="row-span-3">
            <NavigationMenuLink href="/templates/browse" asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/browse"
              >
                <div className="mb-2 mt-4 flex flex-row gap-5 text-lg font-medium">
                  Browse Templates
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Browse, search, and filter through community-created
                  templates. Edit, clone, or use existing templates.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/create" title="Create Template">
            Create a new template from scratch.
          </ListItem>
          <ListItem href="/browse/mine" title="My Templates">
            View templates that you have published or saved.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default TemplatesMenu;
