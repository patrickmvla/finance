import { SelectSingleEventHandler } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

interface Props {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

export const DatePicker = ({ disabled, onChange, value }: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-4 mr-2" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
