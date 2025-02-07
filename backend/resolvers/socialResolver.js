import socialSercive from '../service/socialService.js';

const socialResolver = {
  Query: {
    socials: async () => {
      return await socialSercive.getSocials();
    },
    social: async (_, { id }) => {
      return await socialSercive.getSocialById(id);
    },
    skillByName: async (_, { name }) => {
      return await socialSercive.getSocialByName(name);
    },
  },
  Mutation: {
    createSocial: async (_, { platform, url, icon }) => {
      return await socialSercive.createSocial({
        platform,
        url,
        icon,
      });
    },
  },
};
export default socialResolver;
