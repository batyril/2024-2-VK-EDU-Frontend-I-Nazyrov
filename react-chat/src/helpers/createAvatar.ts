function createAvatar(name: string) {
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${name}`;
}

export default createAvatar;
