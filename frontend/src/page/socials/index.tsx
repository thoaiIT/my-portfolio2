import { Button } from '@/components/ui/button';
import SocialDialog from './components/socialDialog';
import { useRef } from 'react';
import { SkillDialogRefType } from '../skills/components/skillDialog';
import { SocialSchemaType } from './schemas';
import toast from 'react-hot-toast';
import {
  useCreateSocialApi,
  useDeleteSocialApi,
  useGetSocialsApi,
  useUpdateSocialApi,
} from '@/apis/hooks/socialApi.hook';
import SocialTable from './components/socialTable';

const SocialsPage = () => {
  const dialogRef = useRef<SkillDialogRefType>(null);

  const [createSocial] = useCreateSocialApi();
  const { data, refetch } = useGetSocialsApi();
  const [deleteSocial] = useDeleteSocialApi();

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

  const [updateSocial] = useUpdateSocialApi();

  const handleEdit = async (social: SocialSchemaType) => {
    const res = await updateSocial({
      variables: {
        id: social.id as string,
        platform: social.platform,
        icon: social.icon[0],
        url: social.url,
      },
    });

    if (!res.data) return;

    toast.success('Update Social Successfully!');
    refetch();
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSocial({ variables: { id } });

    if (!res.data) return;

    toast.success('Delete Social Successfully!');
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
      <SocialTable
        data={data?.socials || []}
        handleDeleteSocial={handleDelete}
        handleEditSocial={handleEdit}
      />
    </div>
  );
};

export default SocialsPage;
