export default async function ({store, redirect}) {
  // If the user is not authenticated
  // if(process.isClient)
  if (store.getters["isLoggedIn"]) return true;
  redirect("/login")
}
