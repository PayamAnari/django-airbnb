import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";


const MyFavoritesPage = async () => {
  const userId = getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
         <p>You need to be authenticated...</p>
      </main>
    )
  }
  return (
    <main></main>
  )

}