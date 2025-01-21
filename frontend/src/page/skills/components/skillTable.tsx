import { useCallback, useMemo, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import CommonTable from '@/components/table';
import { SkillType } from '@/types/skill';
import { getFullImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import SkillDialog, { SkillDialogRefType } from './skillDialog';
import { SkillSchemaType } from '../schemas';

type SkillSkillTableType = {
  data: SkillType[];
  handleEditSkill: (skill: SkillSchemaType) => void;
  handleDeleteSkill: (id: string) => void;
};

const SkillTable = ({
  data,
  handleEditSkill,
  handleDeleteSkill,
}: SkillSkillTableType) => {
  const dialogRef = useRef<SkillDialogRefType>(null);

  const handleEdit = useCallback(
    (skill: SkillSchemaType) => {
      dialogRef.current?.closeDialog();
      handleEditSkill(skill);
    },
    [handleEditSkill]
  );

  const columns: ColumnDef<SkillType>[] = useMemo(
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
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const skill = row.original;

          return (
            <div className="flex gap-2">
              {/* Nút Edit */}
              <SkillDialog
                trigger={
                  <Button
                    className="text-blue-500 hover:scale-105"
                    variant="secondary"
                  >
                    <SquarePen />
                  </Button>
                }
                handleSubmitForm={handleEdit}
                defaultValues={skill}
                title="Edit Skill"
                buttonLabel="Edit"
                ref={dialogRef}
              />

              {/* Nút Delete */}
              <Button
                className="text-white hover:scale-105"
                variant="destructive"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                <Trash2 />
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDeleteSkill, handleEdit]
  );

  return <CommonTable data={data} columns={columns} />;
};

export default SkillTable;
