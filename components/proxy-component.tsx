"use client";
import { useState } from "react";
import { CommandPalette } from "./command-palette";
import Canvas from "@/src/core/canvas";

export default function ProxyComponent() {
  const [isRunning, useIsRunning] = useState(Canvas.instance.isRunning);
  new Proxy(Canvas.instance, {
    set(target, p, newValue, receiver) {
      console.log("fuomri");
      if (p === "isRunning") {
        console.log("denmtro");
        useIsRunning(newValue);
      }
      return Reflect.set(target, p, newValue, receiver);
    },
  });
  if (isRunning) {
    return null;
  }
  return <CommandPalette />;
}
