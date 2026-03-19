import { insertSupportMessage, fetchSupportMessages } from '../dao/support.dao';

export const createSupportMessage = async (email: string, message: string) => {
  return await insertSupportMessage({ email, message });
};

export const getSupportMessages = async () => {

  return await fetchSupportMessages();

};