export default commit => ({
  commit_id: commit.sha,
  short_commit_id: `${commit.sha.substr(0, 8)}...`,
  message: commit.commit.message,
  when: commit.commit.committer.date,
  committer: {
    name: commit.committer.login,
    avatar: commit.committer.avatar_url
  }
});
