export type CreateSkillResponseType = {
  createSkill: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
};

export type CreateSkillInputType = {
  name: string;
  icon: File;
  description?: string;
};

export type SkillType = {
  id: string;
  name: string;
  description?: string;
  // level: string;
  icon: string;
};

export type GetSkillsResponseType = {
  skills: SkillType[];
};

export type DeleteSkillResponseType = {
  deleteSkill: {
    id: string;
    name: string;
  };
};

export type DeleteSkillInputType = {
  id: string;
};

export type UpdateSkillResponseType = {
  updateSkill: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
};

export type UpdateSkillInputType = {
  id: string;
  name: string;
  icon?: File;
  description?: string;
};
