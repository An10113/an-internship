import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const {id} = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData(){
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      setData(response.data)
      setLoading(true)
    }
    getData()
  },[])
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                { loading ?
                <>
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={data.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">{data.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                  </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{`${data.followers} followers`}</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
                </> : <>
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                    <Skeleton width={150} height={150} borderRadius={9999} />
                      <div className="profile_name">
                        <h4>
                        <Skeleton width={100} height={14} borderRadius={10} />
                          <span className="profile_username"><Skeleton width={30} height={14} borderRadius={10} /></span>
                          <span id="wallet" className="profile_wallet">
                          <Skeleton width={200} height={14} borderRadius={10} />
                          </span>
                        </h4>
                      </div>
                  </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower"><Skeleton width={70} height={14} borderRadius={10} /></div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
                </>
                }
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={data}/>
                </div>
              </div>
            </div>
            </div>

        </section>
      </div>
    </div>
  );
};

export default Author;
