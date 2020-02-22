export const handleDocumentTabRedirect = (
  history: any,
  eventKey: number | string
): void => {
  const url = `/documents/create`;
  if (eventKey === 0) {
    history.push(url + "/standard-document");
  } else if (eventKey === 1) {
    history.push(url + "/voided-document");
  } else if (eventKey === 2) {
    history.push(url + "/summary-document");
  }
};
