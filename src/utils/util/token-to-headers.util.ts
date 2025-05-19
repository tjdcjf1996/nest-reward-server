export const tokenToHeaders = (
  token: string,
  ...args: Record<string, string>[]
): Record<string, string> => {
  return Object.assign(
    { Authorization: token ?? '' },
    ...args,
  );
};
