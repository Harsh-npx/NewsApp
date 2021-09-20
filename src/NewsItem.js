import React, { Component } from "react";
import "./App.css";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <a href={newsUrl} target="blank">
        <div
          className="card my-3 NewsArticle"
          style={{
            width: "18rem",
          }}
        >
          <img
            src={
              !imageUrl
                ? "https://www.touchtaiwan.com/images/default.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <span class="badge bg-success my-1">{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description} </p>
            <p class="card-text">
              <small class="text-muted">
                Published On {new Date(date).toGMTString()} By{" "}
                {author === null ? "unknown" : author}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </a>
    );
  }
}

export default NewsItem;
