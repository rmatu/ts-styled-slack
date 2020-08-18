/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageSubscription
// ====================================================

export interface MessageSubscription_Message_User {
  __typename: "User";
  username: string;
}

export interface MessageSubscription_Message {
  __typename: "Message";
  id: any;
  date: any;
  body: string;
  /**
   * An object relationship
   */
  User: MessageSubscription_Message_User | null;
}

export interface MessageSubscription {
  /**
   * fetch data from the table: "Message"
   */
  Message: MessageSubscription_Message[];
}

export interface MessageSubscriptionVariables {
  channelid?: any | null;
}
