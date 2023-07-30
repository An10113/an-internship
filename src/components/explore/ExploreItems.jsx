import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataNum, setDataNum] = useState(8)
  const [filter , setFilter] = useState(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
  useEffect(() => {
    async function getData(){
      const response = await axios.get(filter)
      setData(response.data)
      setLoading(true)
      setDataNum(8)
    }
    getData()
  },[filter])
  const handleLoadmore = () => {
    setDataNum( number => number + 4)
  }
  const handleFilter = (event) => {
    setFilter(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event.target.value}`)
  }
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      { loading ?
      data.slice(0,dataNum).map((data) => (
        <div
          key={data.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${data.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={data.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {data.expiryDate !== null ? <Countdown time={data.expiryDate} /> : <></>}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${data.nftId}`}>
                <img src={data.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{data.title}</h4>
              </Link>
              <div className="nft__item_price">{`${data.price} ETH`}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{data.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))
    :
    new Array(8).fill(0).map((_, index) => (
      <div
          data-aos="fade-up"
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={9999} />
                </div>
                <div className="absolute right-5 ">
                <Skeleton width={60} height={14} borderRadius={10} />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height={230} borderRadius={10} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width={100} height={14} borderRadius={10} />
                  <div className="nft__item_price">
                  <Skeleton width={60} height={14} borderRadius={10} />
                  </div>
                  <div className="nft__item_like">
                  <Skeleton width={40} height={14} borderRadius={10} />
                  </div>
                </div>
              </div>
            </div>
    ))
    }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadmore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
