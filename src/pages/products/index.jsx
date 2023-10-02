/* eslint-disable @next/next/no-img-element */
import {BoxFaceBook, BoxInstagram, BoxTwitter, Check,} from "@/components/icon/SvgPage";
import AppLayout from "@/layouts/AppLayout";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {Pagination, Skeleton} from "antd";
import ProductCard from "@/components/ProductCard";
import {productFilters} from "@/constant/constant";


const Shop = () => {
    const [currentFilter, setCurrentFilter] = useState('all')
    const [dataSearch, setDataSearch] = useState({
        page: 0, limit: 4, sortBy: "", sortDirection: ""
    })
    const topProductRef = useRef(null);

    const {
        data: productData = {}, isLoading
    } = useQuery(["apiServices.getAllProducts", dataSearch], ({queryKey}) => apiServices.getAllProducts(queryKey[1]), {
        keepPreviousData: true
    })

    const {data: {contents: allProducts = []} = {}} = productData;
    return (<div id="AllShop">
        <div className="container">
            <section className="band_info">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <img src="img/bandInfo.png" alt=""/>
                    </div>
                    <div className="d-flex col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 justify-content-end">
                        <div>
                            <BoxFaceBook/>
                        </div>
                        <div>
                            <BoxInstagram/>
                        </div>
                        <div>
                            <BoxTwitter/>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: "24px", fontWeight: "700", color: "#01040D",
                            }}
                        >
                            Momo Glasses
                        </div>
                        <span
                            style={{
                                fontSize: "15px", fontWeight: "700", color: "#07BFA5",
                            }}
                        >
                mimoglasses.com
              </span>
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: "15px",
                                fontWeight: "400",
                                color: "#01040D",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            12.3k followers
                            <Check/>
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="pb-5">
                    <div
                        style={{
                            fontSize: "24px", fontWeight: "700", color: "#01040D",
                        }}
                        ref={topProductRef}
                    >
                        All Products
                    </div>
                    <div className="Tabs mt-5 d-flex tabs_reponsive">
                        {productFilters.map(item => (<div className="mt-3" key={item.code}>
                            <button
                                className={currentFilter === item.code ? 'products-filter-btn active' : 'products-filter-btn'}
                                onClick={() => {
                                    setCurrentFilter(item.code)
                                    setDataSearch({
                                        ...dataSearch,
                                        page: 0,
                                        sortBy: item.filter.sortBy,
                                        sortDirection: item.filter.sortDirection,
                                    })
                                }}
                            >
                                {item.text}
                            </button>
                        </div>))}
                    </div>
                    <div className="row">
                        {allProducts.map((product) => {
                            return isLoading ? <Skeleton/> : <div key={product.id}
                                                                  className="box_flashSale col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
                                <ProductCard product={product}/>
                            </div>
                        })}

                    </div>
                </div>
            </section>
        </div>
        <Pagination

            current={dataSearch.page + 1}
            onChange={(page, pageSize) => {
                if (topProductRef.current) {
                    topProductRef.current.scrollIntoView({
                        behavior: "smooth"
                    });
                }
                setDataSearch({
                    ...dataSearch, page: page - 1, limit: pageSize,
                })
            }}
            total={productData.data?.totalElements}
            pageSize={dataSearch.limit}
            // showSizeChanger={true}
        />;
    </div>);
};

Shop.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Shop;
