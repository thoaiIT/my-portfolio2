import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FieldError, useForm } from 'react-hook-form';
import { skillSchema, SkillSchemaType } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, getFullImageUrl } from '@/lib/utils';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type SkillDialogPropsType = {
  handleSubmitForm: (data: SkillSchemaType) => void;
  defaultValues?: SkillSchemaType;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  buttonLabel: string;
};

export type SkillDialogRefType = {
  closeDialog: () => void;
};

const SkillDialog = forwardRef<SkillDialogRefType, SkillDialogPropsType>(
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
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, isDirty },
    } = useForm<SkillSchemaType>({
      resolver: zodResolver(skillSchema),
      defaultValues: {
        id: defaultValues?.id || '',
        name: defaultValues?.name || '',
        description: defaultValues?.description || '',
        icon: defaultValues?.icon || null,
      },
    });

    useImperativeHandle(ref, () => ({
      closeDialog: () => setOpen(false),
    }));

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
                  Name
                </Label>
                <Input
                  id="name"
                  wrapStyles="col-span-3"
                  {...register('name')}
                  placeholder="Icon name"
                  error={errors.name}
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
                <Label htmlFor="desc" className="text-right">
                  Descriptions
                </Label>
                <Textarea
                  id="desc"
                  wrapStyles="col-span-3"
                  {...register('description')}
                  placeholder="Descriptions..."
                  error={errors.description}
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

export default SkillDialog;
