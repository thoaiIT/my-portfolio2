import { Button } from '@/components/ui/button';
import SocialDialog from './components/socialDialog';
import { useRef } from 'react';
import { SkillDialogRefType } from '../skills/components/skillDialog';
import { SocialSchemaType } from './schemas';
import toast from 'react-hot-toast';
import {
  useCreateSocialApi,
  useGetSocialsApi,
} from '@/apis/hooks/socialApi.hook';

const SocialsPage = () => {
  const dialogRef = useRef<SkillDialogRefType>(null);
  // API
  const [createSocial, { loading: createLoading, error: CreateError }] =
    useCreateSocialApi();

  const {
    data,
    loading: getLoading,
    error: getError,
    refetch,
  } = useGetSocialsApi();

  // handle functions
  const submitForm = async (data: SocialSchemaType) => {
    const { platform, url, icon } = data;

    const response = await createSocial({
      variables: { platform, icon: icon[0], url },
    });
    if (!response.data) return;

    toast.success('Create Social Successfully!');
    dialogRef.current?.closeDialog();
    refetch();
  };

  return (
    <div className="flex flex-col gap-6 items-end">
      <SocialDialog
        trigger={<Button variant="default">Create Social</Button>}
        handleSubmitForm={submitForm}
        title="Create Skill"
        buttonLabel="Create"
        ref={dialogRef}
      />
      {/* <SkillTable
        data={data?.skills || []}
        handleDeleteSkill={handleDelete}
        handleEditSkill={handleEdit}
      /> */}
    </div>
  );
};

export default SocialsPage;
