import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData(){
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      setData(response.data)
      setLoading(true)
    }
    getData()
  },[])
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              { loading ?
              data.map((data) => (
                <li key={data.id} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                  <div className="author_list_pp">
                    <Link to={`/author/${data.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={data.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${data.authorId}`}>{data.authorName}</Link>
                    <span>{`${data.price} ETH`}</span>
                  </div>
                </li>
              ))
              :
                new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={9999} />
                  </div>
                  <div className="author_list_info">
                    <Skeleton width={120} height={14} />
                    <span>
                    <Skeleton width={40} height={14} />
                    </span>
                  </div>
                </li>
              ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
