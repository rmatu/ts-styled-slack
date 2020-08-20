/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allUsersQuery
// ====================================================

export interface allUsersQuery_User {
  __typename: "User";
  id: string;
  username: string;
}

export interface allUsersQuery {
  /**
   * fetch data from the table: "User"
   */
  User: allUsersQuery_User[];
}

export interface allUsersQueryVariables {
  currentUserId?: string | null;
  filter?: string | null;
}
