import { Button } from '@/components/ui/button';
import { SkillSchemaType } from './schemas';
import {
  useCreateSkillApi,
  useDeleteSkillApi,
  useGetSkillsApi,
  useUpdateSkillApi,
} from '@/apis/hooks/skillApi.hook';
import { useEffect, useRef } from 'react';
import { useLoadingStore } from '@/store/loading.store';
import SkillTable from './components/skillTable';
import SkillDialog, { SkillDialogRefType } from './components/skillDialog';
import toast from 'react-hot-toast';

const SkillsPage: React.FC = () => {
  const [createSkill, { loading, error }] = useCreateSkillApi();
  const {
    data,
    loading: getSkillsLoading,
    error: getSkillsError,
    refetch,
  } = useGetSkillsApi();
  const [deleteSkill, { loading: deleteLoading, error: deleteError }] =
    useDeleteSkillApi();

  const dialogRef = useRef<SkillDialogRefType>(null);

  const [updateSkill, { loading: updateLoading, error: updateError }] =
    useUpdateSkillApi();

  const setLoading = useLoadingStore((state) => state.setLoading);

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

  useEffect(() => {
    setLoading(loading || getSkillsLoading || deleteLoading || updateLoading);
  }, [loading, setLoading, getSkillsLoading, deleteLoading, updateLoading]);

  useEffect(() => {
    if (error) toast.error('Create Skill Failed!');

    if (getSkillsError) toast.error('Get Skills Failed!');

    if (deleteError) toast.error('Delete Skill Failed!');

    if (updateError) toast.error('Update Skill Failed!');
  }, [error, getSkillsError, deleteError, updateError]);

  return (
    <div>
      <SkillDialog
        trigger={<Button variant="outline">Create Skill</Button>}
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
