/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MessageQuery
// ====================================================

export interface MessageQuery_insert_Message_returning {
  __typename: "Message";
  userId: string | null;
  id: any;
  body: string;
  channelId: any;
}

export interface MessageQuery_insert_Message {
  __typename: "Message_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: MessageQuery_insert_Message_returning[];
}

export interface MessageQuery {
  /**
   * insert data into the table: "Message"
   */
  insert_Message: MessageQuery_insert_Message | null;
}

export interface MessageQueryVariables {
  userId: string;
  body?: string | null;
  channelId: any;
}
