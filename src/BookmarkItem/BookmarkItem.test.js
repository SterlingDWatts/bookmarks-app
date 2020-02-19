import React from "react";
import ReactDOM from "react-dom";
import BookmarkItem from "./BookmarkItem";

describe(`BookmarkItem Component`, () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BookmarkItem title="Google" url="https://www.google.com" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
