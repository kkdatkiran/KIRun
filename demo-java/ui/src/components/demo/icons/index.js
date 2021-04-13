import React from "react";

import IconCurvedLine from "./IconCurvedLine";
import IconLeftToRight from "./IconLeftToRight";
import IconRightAngledLine from "./IconRightAngledLine";
import IconStraightLine from "./IconStraightLine";
import IconTopToBottom from "./IconTopToBottom";

const ICON_LIST = {
  kCurvedLine: IconCurvedLine,
  kLeftToRight: IconLeftToRight,
  kRightAngledLine: IconRightAngledLine,
  kStraightLine: IconStraightLine,
  kTopToBottom: IconTopToBottom,
};

export default function KirunIcon({ icon }) {
  let X = ICON_LIST[icon];

  if (!X) return <svg className="kicon" />;

  return <X />;
}
