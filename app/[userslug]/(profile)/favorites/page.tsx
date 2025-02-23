import FavoritesPage from "@/app/[userslug]/(profile)/favorites/favorites-page";

export default async function UserFavoritesPage({ params, }: { params: Promise<{ userslug: string }>; }) {
    const userSlug = (await params).userslug;

    return <FavoritesPage userSlug={userSlug} />;
}