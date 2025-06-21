import Container from "./layout/Container";
import HashtagList from "./hashtag/HashtagList";

import FeedbackItemsContextProvider from "../contexts/FeedbackItemsContextProvider";
import { useFeedbackItemsStore } from "../stores/FeedbackItemsStore";
import { useEffect } from "react";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);
  return (
    <div className="app">
      <FeedbackItemsContextProvider>
        <Container />
        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
