"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Palette,
  Settings,
  Smile,
  User,
} from "lucide-react";
import * as React from "react";

const themes = [
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
  { name: "neon", label: "Neon" },
  { name: "pastel", label: "Pastel" },
  { name: "retro", label: "Retro" },
  { name: "paper-light", label: "Paper Light" },
  { name: "gruvbox", label: "Gruvbox" },
  { name: "gruvbox", label: "Gruvbox" },
  { name: "gruvbox", label: "Gruvbox" },
  { name: "gruvbox", label: "Gruvbox" },
  { name: "gruvbox", label: "Gruvbox" },
];

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Canvas from "@/src/core/canvas";
import { styles } from "@/src/style";
import GLOBAL from "@/src/core/global";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(GLOBAL("style"));

  React.useEffect(() => {
    Canvas.instance.onPause = () => setOpen(true);
    Canvas.instance.onPause = () => setOpen(false);
    Canvas.instance.onToggle = (v) => setOpen(!v);
  }, []);

  function changeTheme(index: number) {
    GLOBAL("style", index);
    setTheme(index);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="overflow-hidden p-0 shadow-lg"
        aria-describedby="dialog"
      >
        <DialogDescription className="hidden"></DialogDescription>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Themes">
              {styles.map((_, i) => (
                <CommandItem key={i} onSelect={() => changeTheme(i)}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span className={i === GLOBAL("style") ? "font-bold" : ""}>
                    {themes[i]?.label || "No name"}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
