const getAvatarByGender = (
  username: string,
  gender: "male" | "female"
): string => {
  const avatarApiUrl = process.env.AVATARS_API_URL;
  const boyAvatarImg = `${avatarApiUrl}/boy?username=${username}`;
  const girlAvatarImg = `${avatarApiUrl}/girl?username=${username}`;

  return gender === "male" ? boyAvatarImg : girlAvatarImg;
};

export default getAvatarByGender;
