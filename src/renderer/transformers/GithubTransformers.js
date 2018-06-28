export const GithubRepoTransformer = repo => ({
  id: repo.id,
  name: repo.full_name,
  description: repo.description,
  url: repo.url,
  openIssues: repo.open_issues_count,
});

export const GithubUserTransformer = user => ({
  id: user.id,
  username: user.login,
  avatar: user.avatar_url,
  url: user.url,
});
