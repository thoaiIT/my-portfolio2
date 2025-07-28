// Create
export type CreateSocialResponseType = {
  createSocial: {
    id: string;
    platform: string;
    icon: string;
    url: string;
  };
};

export type CreateSocialInputType = {
  platform: string;
  icon: File;
  url: string;
};

export type SocialType = {
  id: string;
  platform: string;
  url: string;
  icon: string;
};

export type GetSocialsResponseType = {
  socials: SocialType[];
};

export type UpdateSocialResponseType = {
  updateSocial: {
    id: string;
    platform: string;
    icon: string;
    url: string;
  };
};

export type UpdateSocialInputType = {
  id: string;
  platform: string;
  icon?: File;
  url?: string;
};

export type DeleteSocialResponseType = {
  deleteSocial: { id: string };
};

export type DeleteSocialInputType = {
  id: string;
};
