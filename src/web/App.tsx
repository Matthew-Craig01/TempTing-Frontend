import Nav from "@web/nav/Nav";
import Router from "./Router";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";

const App = () => {
  return (
    <>
      <div className="flex h-screen max-h-screen min-h-screen flex-col bg-background text-foreground">
        <Nav></Nav>
        <div className="h-full overflow-y-hidden">
          <Router />
        </div>
      </div>
    </>
  );
};

export default App;
