/* eslint-disable @next/next/no-img-element */

import {
  Email,
  ImgNewsletter,
  Plus,
  Flash,
  Time,
} from "@/components/icon/SvgPage";
import withAuth from "@/hocs/withAuth";
import { useQuery } from "react-query";
import apiServices from "@/services/apiServices";
import AppLayout from "@/layouts/AppLayout";
import CategoryCard from "@/components/home/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "antd";
import ProfileModal from "@/components/ProfileModal";
import { useState } from "react";

const Home = () => {
  const { data: categoriesData = {}, isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => apiServices.getCategories(),
  });

  const { data: productsData = {} } = useQuery({
    queryKey: "getAllProducts",
    queryFn: () =>
      apiServices.getAllProducts({
        page: 0,
        limit: 12,
        sortBy: "quantity",
        sortDirection: "DESC",
      }),
  });

  //get data from api response
  const { data: categories = [] } = categoriesData;
  const { data: { contents: products = [] } = {} } = productsData;

  console.log("products", products);

  return (
    <div style={{paddingBottom:"50px"}} id="homePage">
      <div className="container">
        <section className="categories">
          <div className="title_section">Categories</div>
          <div className="row">
            {isLoading ? (
              <Skeleton />
            ) : (
              categories.map((category, index) => (
                <div key={category.id} className="box_categories  col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <CategoryCard category={category} />
                </div>
              ))
            )}
          </div>
        </section>
        <section className="flashSale">
          <div className="title_section d-flex align-items-center">
            {" "}
            <Flash />
            <div style={{ margin: "0px 15px" }}>Latest Products</div>
          </div>
          <div className="row justify-content-between">
            {isLoading ? (
              <Skeleton />
            ) : (
              products.map((product, index) => (
                <div key={product.id} className="box_flashSale col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default Home;
