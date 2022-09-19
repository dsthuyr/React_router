import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQuote() {
  const history = useHistory();
  const location = useLocation();
  const { status, sendRequest } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    history.push(location.pathname);
    sendRequest(quoteData);
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
}

export default NewQuote;
