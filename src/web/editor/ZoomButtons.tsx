import { useSize } from "@web/effects";
import { Button } from "@/components/ui/button";
import { LucideZoomIn, Minus, Plus, ZoomIn, ZoomOut } from "lucide-react";
import { FC } from "react";

const ZoomButtons: FC<{
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}> = ({ zoom, setZoom }) => {
  return (
    <div className="absolute bottom-5 md:left-auto left-1/2 flex -translate-x-1/2 md:-translate-x-0 gap-2 md:right-7 opacity-75 hover:opacity-100">
      <Button
        onClick={() => {
          if (zoom > 10) setZoom(zoom - 10);
        }}
        size="sm"
      >
        <ZoomOut />
      </Button>
      <Button
        onClick={() => {
          setZoom(100);
        }}
        className="w-12 text-xs"
        variant="outline"
      >
        {zoom}%
      </Button>
      <Button
        onClick={() => {
          if (zoom < 1000) setZoom(zoom + 10);
        }}
        size="sm"
      >
        <ZoomIn />
      </Button>
    </div>
  );
};

export default ZoomButtons;
