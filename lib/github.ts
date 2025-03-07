import { PaginationResult } from "@/lib/types/generic";
import { Octokit } from "@octokit/core";
import { Session } from "next-auth";

import { GithubRepoDisplay } from "./types/repository";

// since the access token can change, the client isn't created once, but
// recreated for each request
const octoKitClient = (session: Session | null) =>
    new Octokit({
        auth: session?.accessToken,
        throttle: {
            onRateLimit: (
                retryAfter: number,
                options: any,
                octokit: any,
                retryCount: number,
            ) => {
                octokit.log.warn(
                    `Request quota exhausted for request ${options.method} ${options.url}`,
                );

                if (retryCount < 3) {
                    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
            },
            onSecondaryRateLimit: (options: any, octokit: any) => {
                octokit.log.warn(
                    `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
                );
            },
        },
    });

export async function readUsersGithubRepos(
    session: Session,
    page: number,
    pageSize: number,
): Promise<{ repos: Array<GithubRepoDisplay>; pagination: PaginationResult }> {
    const octokit = octoKitClient(session);

    const response = await octokit.request("GET /user/repos", {
        affiliation: "owner",
        per_page: pageSize,
        page,
    });

    const linkHeader = response.headers.link;
    let pageCount: number | undefined;

    if (linkHeader) {
        const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
            pageCount = parseInt(lastPageMatch[1], 10);
        }
    }

    const total = pageCount ? pageCount * pageSize : undefined;

    const pagination: PaginationResult = {
        total: total ?? response.data.length, // fallback if total is not available
        pageCount: pageCount ?? 1, // if last page cannot be determined, then its only 1 page
        page,
        pageSize,
    };

    const repos = response.data.map((repo): GithubRepoDisplay => {
        return {
            name: repo.name,
            visibility: repo.visibility === "public" ? "public" : "private",
            githubFullName: repo.full_name,
            description: repo.description || undefined,
        };
    });

    return { repos, pagination };
}
