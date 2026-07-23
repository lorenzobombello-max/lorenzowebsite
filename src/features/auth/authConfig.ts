export const authArchitecture = {
  providers: ['email magic link', 'Google OAuth', 'Microsoft OAuth'],
  sessionStrategy: 'httpOnly cookie session via backend adapter',
  roles: ['owner', 'editor', 'billing_admin'],
  storage: 'projects, templates, subscriptions en domains via PostgreSQL/Supabase-ready repository laag',
};
