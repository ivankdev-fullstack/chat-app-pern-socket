export interface SignupInputs {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface ConversationType {
  id: string;
  fullname: string;
  avatarImg: string;
}

export type MessageType = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean;
};
