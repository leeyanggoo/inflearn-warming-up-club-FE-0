import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";
import Category from "../../components/Category";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <Banner />

      <Category />

      <Row
        title="DISNEY PLUS ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Horror Movies"
        id="HM"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="Romance Movies"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title="Documentaries"
        id="DM"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
};

export default MainPage;
