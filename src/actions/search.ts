'use server';

import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  const term = formData.get('term');

  if (typeof term !== 'string' || !term) {
    redirect('/');
  }

  redirect(`/search?term=${term}`);
}

// we used this approach for our 'search' functionality instead of the classic react 'onSubmit' client form, because even if the user turns off his/her JS in browser, this functionality still work since we're using a server action.
