// unlike other predefined next.js files, error page must be a client component
'use client'

interface ErrorPageProps{
    error: Error,
    // Error contains some automatically generated info to tell us what went wrong
    rest: () => void,
    // reset can allow us to automatically refresh the route, usually we can embed it inside a button so user can click on it
}

export default function ErrorPage({error} : ErrorPageProps) {
  return (
    <div>{error.message}</div>
  )
}
