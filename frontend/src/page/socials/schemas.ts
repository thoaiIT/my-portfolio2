import { z } from 'zod';

export const socialSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1, 'Name is required'),
  url: z.string().min(1, 'URL is required'),
  icon: z
    .any()
    .refine((file) => file !== null, 'Icon is required')
    .refine((file) => {
      if (typeof file === 'string') return true;
      return file?.[0]?.size <= 5 * 1024 * 1024;
    }, 'File size must be less than 5MB')
    .refine((file) => {
      if (typeof file === 'string') return true;
      return [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
      ].includes(file?.[0]?.type);
    }, 'Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed.'),
});

export type SocialSchemaType = z.infer<typeof socialSchema>;
