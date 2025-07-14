import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UrgencyBadgeProps {
  urgency: 'urgent' | 'medium' | 'low';
  className?: string;
}

export const UrgencyBadge = ({ urgency, className }: UrgencyBadgeProps) => {
  const getUrgencyConfig = () => {
    switch (urgency) {
      case 'urgent':
        return {
          emoji: '🔴',
          text: 'Urgent',
          className: 'bg-gradient-urgent text-urgent-foreground border-urgent/20'
        };
      case 'medium':
        return {
          emoji: '🟠',
          text: 'Medium',
          className: 'bg-gradient-warning text-warning-foreground border-warning/20'
        };
      case 'low':
        return {
          emoji: '🟢',
          text: 'Low',
          className: 'bg-gradient-success text-success-foreground border-success/20'
        };
    }
  };

  const config = getUrgencyConfig();

  return (
    <Badge className={cn(config.className, "font-medium shadow-sm", className)}>
      <span className="mr-1">{config.emoji}</span>
      {config.text}
    </Badge>
  );
};