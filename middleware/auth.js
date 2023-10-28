// Check if user is authenticated or move to login page
export default function ({ app, route, redirect, store }) {
  // if (!app?.$fire?.auth?.currentUser) {
  //   redirect('/login')
  // }

  if (!localStorage.getItem('investor_hub_token')) {
    redirect('/login')
  } else if (route?.path != '/') {
    // redirect('/')
  }
}
