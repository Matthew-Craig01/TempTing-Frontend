import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  ListItem,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUser } from "@web/user/UserProvider";
import { User } from "lucide-react";
import React, { FC } from "react";

export const AccountMenu = () => {
  const { user, setUser } = useUser();

  if (user === null) {
    return <LoggedOut />;
  } else {
    return <LoggedIn username={user}></LoggedIn>;
  }
};

const LoggedIn: FC<{ username: string }> = ({ username }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Account</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
            <li className="row-span-3">
              <div className="flex h-full w-full flex-row justify-between gap-5 p-6">
                <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                  {username}
                </div>
                <div>
                  <div className="flex h-16 w-16 flex-col justify-center overflow-hidden rounded-full bg-foreground">
                    <Avatar>
                      <AvatarImage src="/src/web/icons/logo-solid.svg" />
                      <AvatarFallback>
                        <User></User>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </li>
          </div>
          <ListItem href="/signout" title="Sign Out"></ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const LoggedOut = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Account</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          <ListItem href="/signin" title="Sign In">
            Log in using an existing account.
          </ListItem>
          <ListItem href="/signup" title="Sign Up">
            Create an account.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default AccountMenu;
