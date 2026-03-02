import { insertSupportMessage } from '../dao/support.dao';

export const createSupportMessage = async (email: string, message: string) => {
  return await insertSupportMessage({ email, message });
};