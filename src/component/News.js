import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "genral",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [
    {
      source: {
        id: "news24",
        name: "News24",
      },
      author: "Sport24",
      title:
        "Proteas legend Dale Steyn retires from all cricket: 'Bittersweet, but grateful' | Sport",
      description:
        "Proteas legend Dale Steyn, one of the greatest fastest bowlers in history, has announced his retirement from all cricket.",
      url: "https://www.news24.com/sport/Cricket/Proteas/proteas-legend-dale-steyn-announces-retirement-from-cricket-bittersweet-but-grateful-20210831",
      urlToImage:
        "https://cdn.24.co.za/files/Cms/General/d/8939/f3514bc27145476b9f3caa803a81f292.jpg",
      publishedAt: "2021-08-31T12:34:36+00:00",
      content:
        "Proteas legend Dale Steyn, one of the greatest fastest bowlers in history, has announced his retirement from all cricket. \r\nNow 38-years-old, Steyn is his country's all-time leading wicket-taker in T… [+965 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalArticle: "",
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bb3dfa060e044af8c643e0cbb73c4fb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    document.title = `News Monke - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
    this.props.setProgress(40);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalArticle: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=8bb3dfa060e044af8c643e0cbb73c4fb&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=8bb3dfa060e044af8c643e0cbb73c4fb&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalArticle / this.props.pageSize)
    ) {
      return;
    }
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8bb3dfa060e044af8c643e0cbb73c4fb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    document.title = `News Monke - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticle: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div>
        <div className=" my-3">
          <br />
          <br />
          <center>
            <h2>
              News Monke - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h2>
          </center>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalArticle}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title?.slice(0, 45) + "..."}
                      description={element.description?.slice(0, 88) + "..."}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      newsUrl={element.url}
                      source={element.source.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default News;
