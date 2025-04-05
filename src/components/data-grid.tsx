"use client";
import { Suspense } from "react";
import useGetSummary from "@/modules/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
//icons
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { DataCard, DataCardLoading } from "@/components/data-card";

const DataGridContent = () => {
  const { data, isLoading } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const dateRangeLabel = formatDateRange({ from, to });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        percentChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};

const DataGrid = () => {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
          <DataCardLoading />
          <DataCardLoading />
          <DataCardLoading />
        </div>
      }
    >
      <DataGridContent />
    </Suspense>
  );
};

export default DataGrid;
