export function createMembershipTemplateQuery(ids: string[]) {
  return ids.map((id) => `{Memberships: {userid: {_eq: "${id}"}}}`);
}

export function createMembershipTemplateMutation(ids: string[]) {
  return ids.map((id) => `{userid: "${id}", direct: true }`);
}
