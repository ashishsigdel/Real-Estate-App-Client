import React from "react";

interface sectiontitle {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: sectiontitle) {
  return (
    <div className="text-center my-5 space-y-1">
      <h3 className="font-bold text-[32px] text-success">{title}</h3>
      <p className="text-skin">{description}</p>
    </div>
  );
}
