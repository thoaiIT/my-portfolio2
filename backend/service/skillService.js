import skillRepository from '../repositories/skillRepository.js';

const skillSercive = {
  getSkills: async () => {
    return await skillRepository.findAll();
  },
  getSkillById: async (id) => {
    return await skillRepository.findById(id);
  },
  getSkillByName: async (name) => {
    return await skillRepository.findByName(name);
  },
  createSkill: async (skillData) => {
    return await skillRepository.create(skillData);
  },
  updateSkill: async (id, skillData) => {
    return await skillRepository.update(id, skillData);
  },
  deleteSkill: async (id) => {
    return await skillRepository.delete(id);
  },
};

export default skillSercive;
