import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function goBack(defaultPath = "") {
  if (history.length > 0) {
    history.goBack();
  } else {
    history.push(defaultPath);
  }
}

export default history;
