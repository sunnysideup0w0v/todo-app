import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export default function DeadlinePicker({ value, onChange }) {
  const selected = value ? new Date(value) : undefined

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'flex-1 justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value
              ? format(new Date(value), 'PPP', { locale: ko })
              : '날짜 선택'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={date => onChange(date ? date.toISOString() : null)}
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onChange(null)}
          aria-label="날짜 지우기"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
