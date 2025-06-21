import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemsContext = {
  isLoading: boolean;
  errorMessage: string;
  filteredFeedbackItems: TFeedbackItem[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (text: string) => void;
  companyList: string[];
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children
}: FeedbackItemsContextProviderProps) {
  const { isLoading, errorMessage, setFeedbackItems, feedbackItems } =
    useFeedbackItems();
  const [selectedCompany, setSelectedCompany] = useState("");
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => selectedCompany === feedbackItem.company
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const handleSelectCompany = (text: string) => {
    setSelectedCompany(text);
  };

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase()
    };

    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  };
  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        handleAddToList,
        companyList,
        filteredFeedbackItems,
        handleSelectCompany
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
