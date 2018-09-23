import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import moment from 'moment';
import CompanyList from './CompanyList.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      currentCompanies: [],
      currentPrices: [],
      currentPercentages: [],
      marketisOpen: true,
      showRight: true,
      showLeft: false,
      ticker: 1,
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const time = moment();
    const isOpen = moment('9:00', 'hh:mm');
    const isClosed = moment('15:00', 'hh:mm');
    const marketisOpen = (time.isBetween(isOpen, isClosed));
    this.setState({
      marketisOpen,
    });

    axios.get(`/api/people-also-bought${location.pathname}`)
      .then((res) => {
        const percentDiff = (priceOne, priceTwo) => (((priceTwo - priceOne) / priceOne) * 100);
        this.setState({
          companies: res.data,
          currentCompanies: res.data.slice(0, 4),
          currentPrices: [
            res.data[0].currentDay[0].currentPrice,
            res.data[1].currentDay[0].currentPrice,
            res.data[2].currentDay[0].currentPrice,
            res.data[3].currentDay[0].currentPrice,
          ],

          currentPercentages: [
            percentDiff(res.data[0].currentDay[0].currentPrice,
              res.data[0].currentDay[1].currentPrice).toFixed(2),
            percentDiff(res.data[1].currentDay[0].currentPrice,
              res.data[1].currentDay[1].currentPrice).toFixed(2),
            percentDiff(res.data[2].currentDay[0].currentPrice,
              res.data[2].currentDay[1].currentPrice).toFixed(2),
            percentDiff(res.data[3].currentDay[0].currentPrice,
              res.data[3].currentDay[1].currentPrice).toFixed(2),
          ],
        });
        this.updateData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRandomIntInclusive() {
    const { min } = this.state;
    const { max } = this.state;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateData() {
    const { currentCompanies } = this.state;
    const thisFunc = this;

    const percentDiff = (priceOne, priceTwo) => (((priceTwo - priceOne) / priceOne) * 100);

    const theLoop = (i) => {
      setTimeout(() => {
        const time = moment();
        const isOpen = moment('9:00', 'hh:mm');
        const isClosed = moment('15:00', 'hh:mm');
        const marketisOpen = (time.isBetween(isOpen, isClosed));

        thisFunc.setState({
          ticker: i,
          currentPrices: [
            currentCompanies[0].currentDay[i].currentPrice,
            currentCompanies[1].currentDay[i].currentPrice,
            currentCompanies[2].currentDay[i].currentPrice,
            currentCompanies[3].currentDay[i].currentPrice,
          ],
          currentPercentages: [
            percentDiff(currentCompanies[0].currentDay[0].currentPrice,
              currentCompanies[0].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[1].currentDay[0].currentPrice,
              currentCompanies[1].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[2].currentDay[0].currentPrice,
              currentCompanies[2].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[3].currentDay[0].currentPrice,
              currentCompanies[3].currentDay[i].currentPrice).toFixed(2),
          ],
          marketisOpen,
        });
        if (i++) {
          theLoop(i);
        }
      }, 10000);
    };
    theLoop(1);
  }

  handleArrowClick(e) {
    const {
      showLeft, showRight, companies, ticker,
    } = this.state;

    const arrow = e.target.getAttribute('name');
    let updatedState = {};
    let nextCurrentCompanies = [];

    const percentDiff = (priceOne, priceTwo) => (((priceTwo - priceOne) / priceOne) * 100);

    if (!showLeft) {
      nextCurrentCompanies = companies.slice(4, 8);
      updatedState = {
        showLeft: true,
      };
    } else if (!showRight) {
      nextCurrentCompanies = companies.slice(4, 8);
      updatedState = {
        showRight: true,
      };
    } else if (arrow === 'left') {
      nextCurrentCompanies = companies.slice(0, 4);
      updatedState = {
        showLeft: false,
      };
    } else {
      nextCurrentCompanies = companies.slice(8, 12);
      updatedState = {
        showRight: false,
      };
    }
    this.setState({
      ...updatedState,
      currentCompanies: nextCurrentCompanies,
      currentPrices: [
        nextCurrentCompanies[0].currentDay[ticker].currentPrice,
        nextCurrentCompanies[1].currentDay[ticker].currentPrice,
        nextCurrentCompanies[2].currentDay[ticker].currentPrice,
        nextCurrentCompanies[3].currentDay[ticker].currentPrice,
      ],
      currentPercentages: [
        percentDiff(nextCurrentCompanies[0].currentDay[0].currentPrice,
          nextCurrentCompanies[0].currentDay[ticker].currentPrice).toFixed(2),
        percentDiff(nextCurrentCompanies[1].currentDay[0].currentPrice,
          nextCurrentCompanies[1].currentDay[ticker].currentPrice).toFixed(2),
        percentDiff(nextCurrentCompanies[2].currentDay[0].currentPrice,
          nextCurrentCompanies[2].currentDay[ticker].currentPrice).toFixed(2),
        percentDiff(nextCurrentCompanies[3].currentDay[0].currentPrice,
          nextCurrentCompanies[3].currentDay[ticker].currentPrice).toFixed(2),
      ],
    });
  }

  render() {
    const {
      currentPercentages,
      currentCompanies,
      currentPrices,
      marketisOpen,
      showRight,
      showLeft,
    } = this.state;

    return (
      <div className={marketisOpen ? 'robinhood-is-open' : 'robinhood-is-closed'}>
        <h1 className={`header-title ${marketisOpen ? 'robinhood-is-open' : 'robinhood-is-closed'} `}>People Also Bought</h1>
        <div>
          <CompanyList
            companies={currentCompanies}
            currentPrices={currentPrices}
            currentPercentages={currentPercentages}
            marketisOpen={marketisOpen}
            showRight={showRight}
            showLeft={showLeft}
            handleArrowClick={this.handleArrowClick}
            updatePriceChange={this.updatePriceChange}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('peopleAlsoBought'));
