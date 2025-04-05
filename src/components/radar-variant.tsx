import CategoryTooltip from "@/components/category-tooltip";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  data?: {
    value: number;
    name: string;
  }[];
};

const RadarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx={"50%"} cy={"50%"} outerRadius={"60%"} data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Tooltip content={CategoryTooltip} />
        <Radar
          stroke="#3b82f6"
          fill="#3b82f6"
          dataKey={"value"}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarVariant;
