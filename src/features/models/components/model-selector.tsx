import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useModelStore from "../store";
import { modelGroups } from "../types/models";

export default function ModelSelector() {
  const { currentModel, setCurrentModel } = useModelStore();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // show model breifly after change
  useEffect(() => {
    setTooltipOpen(true);
    const timer = setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentModel.id]);

  return (
    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Brain className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent>
          {modelGroups.map((group) => (
            <DropdownMenuSub key={group.provider}>
              <DropdownMenuSubTrigger>{group.provider}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {group.models.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      className="hover:cursor-pointer"
                      onClick={() => setCurrentModel(model)}
                    >
                      {model.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>{currentModel.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
