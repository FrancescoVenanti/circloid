"use client";

import sound from "@/src/core/sound";
import { Music, Palette } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import canvas from "@/src/core/canvas";
import global from "@/src/core/global";
import { styles } from "@/src/style";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [_, setTheme] = React.useState(global.use("style"));
  const [musicEnabled, setMusicEnabled] = React.useState(
    global.use("music") != null
  );

  React.useEffect(() => {
    canvas.onPause = () => setOpen(true);
    canvas.onPause = () => setOpen(false);
    canvas.onToggle = (v) => setOpen(!v);
  }, []);

  function changeTheme(index: number) {
    global.use("style", index);
    setTheme(index);
  }

  function toggleMusic() {
    setMusicEnabled((prev) => !prev);
    if (musicEnabled) {
      global.use("music", sound.audio("background"));
      global.use("music")?.play();
    } else {
      global.use("music")?.pause();
      global.use("music")?.remove();
      global.use("music", null);
    }
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
              {Object.keys(styles).map((key, i) => (
                <CommandItem key={key} onSelect={() => changeTheme(i)}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span
                    className={i === global.use("style") ? "font-bold" : ""}
                  >
                    {key[0].toUpperCase() + key.substring(1).toLowerCase() || "No name"}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Music">
              <CommandItem onSelect={toggleMusic}>
                <Music className="mr-2 h-4 w-4" />
                <span>{musicEnabled ? "Disable Music" : "Enable Music"}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
