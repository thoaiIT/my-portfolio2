import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { socialSchema, SocialSchemaType } from '../schemas';
import { FieldError, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn, getFullImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SocialDialogPropsType = {
  handleSubmitForm: (data: SocialSchemaType) => void;
  defaultValues?: SocialSchemaType;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  buttonLabel: string;
};

export type SocialDialogRefType = {
  closeDialog: () => void;
};

const SocialDialog = forwardRef<SocialDialogRefType, SocialDialogPropsType>(
  (
    {
      handleSubmitForm,
      defaultValues,
      trigger,
      title,
      description,
      buttonLabel,
    },
    ref
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [iconUrl, setIconUrl] = useState<string>(defaultValues?.icon);

    useImperativeHandle(ref, () => ({
      closeDialog: () => setOpen(false),
    }));

    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, isDirty },
    } = useForm<SocialSchemaType>({
      resolver: zodResolver(socialSchema),
      defaultValues: {
        id: defaultValues?.id || '',
        platform: defaultValues?.platform || '',
        url: defaultValues?.url || '',
        icon: defaultValues?.icon || null,
      },
    });

    const { icon } = watch();

    useEffect(() => {
      if (typeof icon === 'string') {
        setIconUrl(icon);
      } else setIconUrl('');
    }, [icon]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" onClose={() => reset()}>
          <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right" isRequired>
                  Platform
                </Label>
                <Input
                  id="platform"
                  wrapStyles="col-span-3"
                  {...register('platform')}
                  placeholder="Platform"
                  error={errors.platform}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right" isRequired>
                  Icon
                </Label>
                <div className="col-span-3">
                  {iconUrl && (
                    <label htmlFor="icon">
                      <img
                        src={getFullImageUrl(iconUrl)}
                        alt="Skill Icon"
                        className="h-8 w-8 rounded-full cursor-pointer"
                      />
                    </label>
                  )}
                  <Input
                    id="icon"
                    type="file"
                    wrapStyles="w-full"
                    {...register('icon')}
                    className={cn(
                      'border-none shadow-none pl-0',
                      iconUrl && 'hidden'
                    )}
                    error={errors.icon as FieldError}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right" isRequired>
                  URL
                </Label>
                <Input
                  id="platform"
                  wrapStyles="col-span-3"
                  {...register('url')}
                  placeholder="URL of the platform"
                  error={errors.platform}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isDirty}>
                {buttonLabel}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

export default SocialDialog;
