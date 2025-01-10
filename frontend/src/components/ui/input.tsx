import React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

type InputType = React.ComponentProps<'input'> & {
  error?: FieldError;
};

const Input = React.forwardRef<HTMLInputElement, InputType>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref} // Đảm bảo ref hoạt động
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          {...props} // Đảm bảo mọi props từ react-hook-form được truyền xuống
        />
        {error && <span className="text-red-600">{error.message}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
