/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitMessage
// ====================================================

export interface SubmitMessage_insert_Message_returning {
  __typename: "Message";
  userId: string | null;
  id: any;
  body: string;
  channelId: any;
}

export interface SubmitMessage_insert_Message {
  __typename: "Message_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: SubmitMessage_insert_Message_returning[];
}

export interface SubmitMessage {
  /**
   * insert data into the table: "Message"
   */
  insert_Message: SubmitMessage_insert_Message | null;
}

export interface SubmitMessageVariables {
  userId: string;
  body?: string | null;
  channelId: any;
}
