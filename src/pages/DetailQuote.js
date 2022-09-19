import React, { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getQuoteById } from "../lib/api";

// const DUMMY_DATA = [
//   { id: "q1", author: "Max", text: "Learning React is fun" },
//   { id: "q2", author: "Ben", text: "Learning Vue is fun" },
//   { id: "q3", author: "Billy", text: "Learning HTML is great" },
//   { id: "q4", author: "Lisa", text: "Learning CSS is great" },
// ];

function DetailQuote() {
  const {
    status,
    data: loadedQuote,
    error,
    sendRequest,
  } = useHttp(getQuoteById, true);

  const params = useParams();
  const match = useRouteMatch();
  // console.log(params);
  // console.log(match);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (status === "complete" && (!loadedQuote || loadedQuote.length === 0)) {
    return <NoQuotesFound />;
  }

  const quote = loadedQuote;

  if (!quote) {
    return <p>Not found quote!</p>;
  }

  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      {/* <Route path={`${location.pathname}/${params.quoteId}`} exact> */}
      <Route path={match.url} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
}

export default DetailQuote;
