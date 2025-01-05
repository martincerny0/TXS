import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Type,
  Pencil,
  ZoomIn,
  Move,
  Sparkles,
  Settings,
  TrendingUp,
  MousePointer,
  X
} from "lucide-react";
import type { ChartTool } from "@/types/chart";
import Logo from "@/app/_components/Logo/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ToolSidebarProps {
  updateCurrentTool: (tool: ChartTool) => void;
  selectedTool: ChartTool;
}

const ToolSidebar: React.FC<ToolSidebarProps> = ({ updateCurrentTool, selectedTool }) => {
    const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
      const [aiMessage, setAIMessage] = useState<string>('');
  
  return (
    <div className="border-r border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex w-16 flex-col items-center space-y-4">
        <Logo height={10} width={10} className="h-10 w-10" />
      </div>
      <div className="flex w-16 flex-col items-center space-y-4 mt-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
              className={`${selectedTool === "cursor" ? "bg-gray-200 dark:bg-gray-700" : ""}`}	
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("cursor")}
              >
                <MousePointer className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Cursor (Default)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`${selectedTool === "text" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("text")}
              >
                <Type className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add text annotations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`${selectedTool === "draw" ? "bg-gray-200 dark:bg-gray-700" : ""}`}	
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("draw")}
              >
                <Pencil className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Draw on graph</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
              className={`${selectedTool === "zoom" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("zoom")}
              >
                <ZoomIn className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Zoom graph</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
              className={`${selectedTool === "move" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("move")}
              >
                <Move className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Move graph</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
              className={`${selectedTool === "trendline" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() => updateCurrentTool("trendline")}
              >
                <TrendingUp className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Draw trend line</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Popover open={isAiAssistantOpen} onOpenChange={setIsAiAssistantOpen}>
            <PopoverTrigger asChild>
              <Button
              className={`${isAiAssistantOpen ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                variant="ghost"
                size="icon"
              >
                <Sparkles className="h-6 w-6" />
              </Button>
              </PopoverTrigger>
        <PopoverContent className="w-80" side="right" align="center">
          <div className="space-y-4">
            <h3 className="font-medium">AI Assistant</h3>
            <div className="space-y-2">
              {["Analyze performance", "Predict trends", "Compare assets", "Explain movements", "Suggest allocation"].map((snippet, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => setAIMessage(snippet)}
                >
                  {snippet}
                </Button>
              ))}
            </div>
            {aiMessage && (
              <div className="pt-4 border-t">
                <p className="text-sm">{aiMessage}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setAIMessage('')}
                >
                  <X className="mr-2 w-4 h-4" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

            </TooltipTrigger>
            <TooltipContent side="right">
              <p>AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className=" flex w-16 flex-col items-center space-y-4 mt-56">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ToolSidebar;
