export type DocumentType =
  | "invoice"
  | "credit-note"
  | "debit-note"
  | "voided-document"
  | "summary-document";

export interface SearchResultsRepresentation<T> {
  items: T[];
  totalSize: number;
}
