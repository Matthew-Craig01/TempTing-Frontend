import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const Left = () => {
  const { theme } = useTheme();
  return (
    <a className="flex justify-center sm:block" href="/">
      <Button
        variant="link"
        className="flex justify-between gap-2 text-lg font-semibold"
      >
        <img
          className={theme === "light" ? "max-h-9" : "max-h-9 invert"}
          src="/src/web/icons/logo.svg"
        ></img>
        TempTing
      </Button>
    </a>
  );
};

export default Left;
