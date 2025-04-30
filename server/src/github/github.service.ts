import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class GithubService {
  private getRepositoryResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.object({
      id: z.number(),
      login: z.string(),
    }),
    html_url: z.string().url(),
    created_at: z.string().datetime(),
    stargazers_count: z.number(),
    forks_count: z.number(),
    open_issues_count: z.number(),
  });

  async getRepository(repositoryAuthor: string, repositoryName: string) {
    const response = await fetch(
      `https://api.github.com/repos/${repositoryAuthor}/${repositoryName}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching repository: ${response.statusText}`);
    }

    const parsedData = this.getRepositoryResponseSchema.parse(
      await response.json(),
    );

    return {
      id: parsedData.id,
      name: parsedData.name,
      owner: {
        id: parsedData.owner.id,
        login: parsedData.owner.login,
      },
      htmlUrl: parsedData.html_url,
      createdAt: parsedData.created_at,
      starsCount: parsedData.stargazers_count,
      forksCount: parsedData.forks_count,
      openIssuesCount: parsedData.open_issues_count,
    };
  }
}
