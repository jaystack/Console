export const GithubRepoTransformer = repo => ({
  id: repo.id,
  name: repo.full_name,
  description: repo.description,
  url: repo.url,
  openIssues: repo.open_issues_count,
});

export const GithubUserTransformer = user => ({
  id: user.id,
  name: user.name,
  username: user.login,
  email: user.email,
  avatar: user.avatar_url,
  url: user.html_url,
});

export const GithubCommitTransformer = commit => ({
  id: commit.sha,
  url: commit.url,
  committer: commit.committer ? commit.committer.id : 'Error retrieving committer',
  message: commit.commit ? commit.commit.message : 'Error retrieving message',
  created: commit.commit ? commit.commit.committer.date : null
});
