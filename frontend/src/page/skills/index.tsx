import { Button } from '@/components/ui/button';
import { SkillSchemaType } from './schemas';
import {
  useCreateSkillApi,
  useDeleteSkillApi,
  useGetSkillsApi,
  useUpdateSkillApi,
} from '@/apis/hooks/skillApi.hook';
import { useRef } from 'react';
import SkillTable from './components/skillTable';
import SkillDialog, { SkillDialogRefType } from './components/skillDialog';
import toast from 'react-hot-toast';

const SkillsPage: React.FC = () => {
  const [createSkill] = useCreateSkillApi();
  const { data, refetch } = useGetSkillsApi();
  const [deleteSkill] = useDeleteSkillApi();

  const dialogRef = useRef<SkillDialogRefType>(null);

  const [updateSkill] = useUpdateSkillApi();

  const submitForm = async (data: SkillSchemaType) => {
    const { name, description, icon } = data;

    const response = await createSkill({
      variables: { name, icon: icon[0], description },
    });
    if (!response.data) return;

    toast.success('Create Skill Successfully!');
    dialogRef.current?.closeDialog();
    refetch();
  };

  const handleEdit = async (skill: SkillSchemaType) => {
    const res = await updateSkill({
      variables: {
        id: skill.id as string,
        name: skill.name,
        icon: skill.icon[0],
        description: skill.description,
      },
    });

    if (!res.data) return;

    toast.success('Update Skill Successfully!');
    refetch();
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSkill({ variables: { id } });
    if (!res.data) return;

    toast.success('Delete Skill Successfully!');
    refetch();
  };

  return (
    <div className="flex flex-col gap-6 items-end">
      <SkillDialog
        trigger={<Button variant="default">Create Skill</Button>}
        handleSubmitForm={submitForm}
        title="Create Skill"
        buttonLabel="Create"
        ref={dialogRef}
      />
      <SkillTable
        data={data?.skills || []}
        handleDeleteSkill={handleDelete}
        handleEditSkill={handleEdit}
      />
    </div>
  );
};

export default SkillsPage;
