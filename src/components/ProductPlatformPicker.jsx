import { useEffect, useState } from "react";
import { detectPlatform } from "../data/site.js";

export function useProductPlatform() {
  const [platform, setPlatform] = useState("ios");
  useEffect(() => {
    try {
      const selected = window.sessionStorage.getItem("unfold-preview-platform");
      if (selected === "ios" || selected === "android") {
        setPlatform(selected);
        return;
      }
    } catch {
      // Preview controls still work when browser storage is unavailable.
    }
    if (detectPlatform() === "android") setPlatform("android");
  }, []);
  const choosePlatform = (value) => {
    setPlatform(value);
    try {
      window.sessionStorage.setItem("unfold-preview-platform", value);
    } catch {
      // The current page keeps the selection without persisting it.
    }
  };
  return [platform, choosePlatform];
}

export default function ProductPlatformPicker({ platform, onChange }) {
  return (
    <div className="product-platform-picker" role="group" aria-label="App preview platform">
      {[["ios", "iPhone"], ["android", "Android"]].map(([value, label]) => (
        <button key={value} type="button" aria-pressed={platform === value} onClick={() => onChange(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}
