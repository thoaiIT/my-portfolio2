import * as React from 'react';

import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

type TextareaCustomType = {
  error?: FieldError;
  wrapStyles?: string;
};

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & TextareaCustomType
>(({ className, error, wrapStyles, ...props }, ref) => {
  return (
    <div className={wrapStyles}>
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
