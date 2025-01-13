import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

type LabelCustomType = {
  isRequired?: boolean;
};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> &
    LabelCustomType
>(({ className, isRequired, ...props }, ref) => (
  <div className="flex gap-1 items-center">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
    {isRequired && <span className="text-red-600">*</span>}
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
