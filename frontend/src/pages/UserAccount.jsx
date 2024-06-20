import React from 'react';
import { PostsQuotes } from '../App'; // Make sure the import path is correct

export default function UserAccount() {
  const { UserAccountProps }  = PostsQuotes(); // Call the PostsQuotes function to get UserAccountProps

  return (
    <>
      <UserAccountProps />
    </>
  );
}
