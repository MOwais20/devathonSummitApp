// Check if user is authenticated or move to login page
export default function ({ app, route, redirect, store }) {
  if (!app?.$fire?.auth?.currentUser) {
    redirect('/login')
  }
}
