import { createAvatar } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';

function generateAvatar(userName) {
  const avatar = createAvatar(miniavs, {
    seed: userName,
    scale: 80,
    radius: 20,
  });

  return avatar.toString();
}

export const createAvatarElement = (name) => {
  const avatarSvg = generateAvatar(name);

  const imageElement = document.createElement('div');
  imageElement.className = 'avatar';

  imageElement.innerHTML = avatarSvg;

  return imageElement;
};
export default createAvatarElement;
