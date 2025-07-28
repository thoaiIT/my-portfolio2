import { SocialType } from '@/types/social';
import { SocialSchemaType } from '../schemas';
import { useCallback, useMemo, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { getFullImageUrl } from '@/lib/utils';
import SocialDialog, { SocialDialogRefType } from './socialDialog';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import CommonTable from '@/components/table';

type SocialTableType = {
  data: SocialType[];
  handleEditSocial: (social: SocialSchemaType) => void;
  handleDeleteSocial: (id: string) => void;
};

const SocialTable = ({
  data,
  handleEditSocial,
  handleDeleteSocial,
}: SocialTableType) => {
  const dialogRef = useRef<SocialDialogRefType>(null);

  const handleEdit = useCallback(
    (social: SocialSchemaType) => {
      dialogRef.current?.closeDialog();
      handleEditSocial(social);
    },
    [handleEditSocial]
  );

  const columns: ColumnDef<SocialType>[] = useMemo(
    () => [
      {
        id: 'no', // Đặt `id` để định danh cột
        header: 'No.',
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        accessorKey: 'icon',
        header: 'Icon',
        cell: ({ getValue }) => (
          <img
            src={getFullImageUrl(getValue() as string)}
            alt="Skill Icon"
            className="h-8 w-8 rounded-full"
          />
        ),
      },
      {
        accessorKey: 'platform',
        header: 'Platform',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const social = row.original;

          return (
            <div className="flex gap-2">
              {/* Nút Edit */}
              <SocialDialog
                trigger={
                  <Button
                    className="text-blue-500 hover:scale-105"
                    variant="secondary"
                  >
                    <SquarePen />
                  </Button>
                }
                handleSubmitForm={handleEdit}
                defaultValues={social}
                title="Edit Social"
                buttonLabel="Edit"
                ref={dialogRef}
              />

              {/* Nút Delete */}
              <Button
                className="text-white hover:scale-105"
                variant="destructive"
                onClick={() => handleDeleteSocial(social.id)}
              >
                <Trash2 />
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDeleteSocial, handleEdit]
  );
  return <CommonTable data={data} columns={columns} />;
};

export default SocialTable;
