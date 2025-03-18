"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import canvas from "@/src/core/canvas";
import global from "@/src/core/global";
import { Button } from "@/components/ui/button";

export default function GameInstructionsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    global.use("running", true);
    setIsOpen(false);
  };

  const handleReset = () => {
    global.use("running", false);
    setIsOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              How to Play
            </DialogTitle>
            <DialogDescription>
              Learn the rules and controls of the game
            </DialogDescription>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            ></button>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Game Objective</h3>
              <p className="text-muted-foreground">
                Your goal is to avoid the enemies to collect as many points and
                credits as possible. You can then use your credits to gain
                upgrades.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Controls</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>
                  <span className="font-medium">Move:</span> Arrow keys or WASD
                </li>
                <li>
                  <span className="font-medium">Upgrades:</span> Numbers from 1
                  to 6
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upgrades</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex  items-center justify-center text-white">
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">SPEED</span>
                    <span>Speed of the player</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex  items-center justify-center text-white">
                    C
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">CONSTRAINT</span>
                    <span>Area in which the player can move</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-red-500 flex  items-center justify-center text-white">
                    L
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">LIVES</span>
                    <span>Player's lives</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-orange-500 flex  items-center justify-center text-white">
                    W
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">WALL</span>
                    <span>A small wall on the constraint</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-purple-500 flex  items-center justify-center text-white">
                    C
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">CYCLONE</span>
                    <span>Friendly entities around the player</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-500 flex  items-center justify-center text-white">
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">SHIELD</span>
                    <span>Shield that follow player's direction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button onClick={handleClose}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Optional button to show instructions again */}
      <Button
        variant="secondary"
        size="sm"
        onClick={handleReset}
        className="fixed bottom-20 right-6 z-10"
      >
        <Info></Info>
      </Button>
    </>
  );
}
