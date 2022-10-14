export const createAvatarFallbackText = (title: string) =>
  title
    .split(' ')
    .map(name => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
