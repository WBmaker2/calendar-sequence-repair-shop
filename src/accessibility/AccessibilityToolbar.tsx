import { useEffect, useState } from "react";

const TEXT_SIZES = [
  { label: "보통", value: "100%" },
  { label: "크게", value: "112.5%" },
  { label: "아주 크게", value: "125%" },
] as const;

export default function AccessibilityToolbar() {
  const [textSize, setTextSize] = useState<string>("100%");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = textSize;
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
    return () => {
      document.documentElement.classList.remove("reduce-motion");
    };
  }, [reduceMotion]);

  return (
    <div className="accessibility-toolbar" role="group" aria-label="화면 도구">
      <span className="toolbar-label">글자 크기</span>
      {TEXT_SIZES.map((size) => (
        <button
          key={size.value}
          type="button"
          className="toolbar-button"
          aria-pressed={textSize === size.value}
          onClick={() => setTextSize(size.value)}
        >
          {size.label}
        </button>
      ))}
      <button
        type="button"
        className="toolbar-button"
        aria-pressed={reduceMotion}
        onClick={() => setReduceMotion((current) => !current)}
      >
        애니메이션 줄이기
      </button>
    </div>
  );
}
