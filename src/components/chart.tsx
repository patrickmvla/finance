import { AreaChart, BarChart, FileSearch, LineChart, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AreaVariant } from "./area-variant"
import { BarVariant } from "./bar-variant"
import { LineVariant } from "./line-variant"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Skeleton } from "./ui/skeleton"

type Props = {
  data?: {
    date: string,
    income: number
    expense: number
  }[]
}

export const Chart = ({
  data = []
}: Props) => {
  const [chartType, setChartType] = useState('area')

  const onTypeChange = (type: string) => {
    setChartType(type)
  }

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transactions
        </CardTitle>
        <Select 
          defaultValue={chartType} 
          onValueChange={onTypeChange}
        >
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-cneter">
                <AreaChart className="size-4 mr-2 shrink-0"/>
                <p className="line-clamp-1"> Area Chart </p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-cneter">
                <BarChart className="size-4 mr-2 shrink-0"/>
                <p className="line-clamp-1"> Bar Chart </p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-cneter">
                <LineChart className="size-4 mr-2 shrink-0"/>
                <p className="line-clamp-1"> Line Chart </p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 to-muted-foreground" />
            <p className="to-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === 'line' && <LineVariant data={data} /> }
            {chartType === 'bar' && <BarVariant data={data} /> }
            {chartType === 'area' && <AreaVariant data={data}/> }
          </>
        )}
      </CardContent>
    </Card>
  )
}

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};