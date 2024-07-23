import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {type VariantProps, cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'focus-visible:ring-grey-950 dark:ring-offset-grey-950 dark:focus-visible:ring-grey-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-grey-900 text-grey-50 hover:bg-grey-900/90 dark:bg-grey-50 dark:text-grey-900 dark:hover:bg-grey-50/90',
                destructive:
                    'text-grey-50 dark:text-grey-50 bg-red-500 hover:bg-red-500/90 dark:bg-red-900 dark:hover:bg-red-900/90',
                outline:
                    'border-grey-200 hover:bg-grey-100 hover:text-grey-900 dark:border-grey-800 dark:bg-grey-950 dark:hover:bg-grey-800 dark:hover:text-grey-50 border bg-white',
                secondary:
                    'bg-grey-100 text-grey-900 hover:bg-grey-100/80 dark:bg-grey-800 dark:text-grey-50 dark:hover:bg-grey-800/80',
                ghost: 'hover:bg-grey-100 hover:text-grey-900 dark:hover:bg-grey-800 dark:hover:text-grey-50',
                link: 'text-grey-900 dark:text-grey-50 underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({variant, size, className}))}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
