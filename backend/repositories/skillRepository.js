import Skill from '../models/Skill.js';

const skillRepository = {
  findAll: async () => await Skill.find(),
  findById: async (id) => await Skill.findById(id),
  findByName: async (name) => await Skill.findOne({ name }),
  create: async (skillData) => {
    const skill = new Skill(skillData);
    await skill.save();
    return skill;
  },
  update: async (id, skillData) => {
    const updatedSkill = await Skill.findByIdAndUpdate(id, skillData, {
      new: true,
      runValidators: true,
    });
    return updatedSkill;
  },
  delete: async (id) => {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    return deletedSkill;
  },
};

export default skillRepository;
