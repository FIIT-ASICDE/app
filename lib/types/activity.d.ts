export type Activity = {
    id: string;
    userId: string;
    username: string;
    repoId: string;
    repoTitle: string;
    organizationTitle: string;
    image: string;
    activityType: ActivityType;
    createdAt: Date;
};

export enum ActivityType {
    PUSH,
    STAR,
    CREATE_ORG,
    JOINED_ORG,
    CREATE_REPO,
}
