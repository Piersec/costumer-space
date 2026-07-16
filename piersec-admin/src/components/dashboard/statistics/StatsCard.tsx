import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
}: StatsCardProps) {
  return (
    <div className="
      rounded-xl
      border
      bg-card
      p-5
      flex
      justify-between
      items-start
    ">
      <div>
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>
      </div>

      <div className="
        p-3
        rounded-lg
        bg-primary/10
        text-primary
      ">
        {icon}
      </div>
    </div>
  );
}