"use client";
import Canvas from "@/src/core/canvas";
import GLOBAL from "@/src/core/global";
import { useEffect, useState } from "react";
import { CommandPalette } from "./command-palette";

export default function ProxyComponent() {
  const [isRunning, useIsRunning] = useState(GLOBAL('running'));
  useEffect(() => {
    Canvas.instance.onPause = () => { useIsRunning(true); console.log('pausaaaa') }
    Canvas.instance.onPause = () => useIsRunning(false);
    Canvas.instance.onToggle = (v) => useIsRunning(v);
  }, []);
  if (isRunning) {
    return null;
  }
  return <CommandPalette />;
}
