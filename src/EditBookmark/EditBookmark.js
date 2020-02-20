import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import config from "../config";
import "./EditBookmark.css";

class EditBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
    title: "",
    url: "",
    description: "",
    rating: 1
  };

  componentDidMount() {
    const { bookmarkId } = this.props.match.params;
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${config.API_KEY}` }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleTitleChange = title => {
    this.setState({
      title
    });
  };

  handleUrlChange = url => {
    this.setState({
      url
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description
    });
  };

  handleRatingChange = rating => {
    this.setState({
      rating
    });
  };

  resetFields = newFields => {
    this.setState({
      id: newFields.id || "",
      title: newFields.title || "",
      url: newFields.url || "",
      description: newFields.description || "",
      rating: newFields.rating || ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { bookmarkId } = this.props.match.params;
    const { id, title, url, description, rating } = this.state;
    const newBookmark = { id, title, url, description, rating };
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: "PATCH",
      body: JSON.stringify(newBookmark),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        this.resetFields(newBookmark);
        this.context.updateBookmark(newBookmark);
        this.props.history.push("/");
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="EditBookmark">
        <h2>Edit Bookmark</h2>
        <form
          className="EditBookmark__form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className="EditBookmark__error" role="alert">
            {error && <p>error.message</p>}
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={e => this.handleTitleChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              value={this.state.url}
              onChange={e => this.handleUrlChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={this.state.description}
              onChange={e => this.handleDescriptionChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              id="rating"
              min="1"
              max="5"
              value={this.state.rating}
              onChange={e => this.handleRatingChange(e.target.value)}
            />
          </div>
          <div className="EditBookmark__buttons">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
