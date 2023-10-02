/* eslint-disable @next/next/no-img-element */
import { Circle, Plus, Start2 } from "@/components/icon/SvgPage";
import AppLayout from "@/layouts/AppLayout";
import { Carousel, Skeleton } from "antd";
import { useQuery } from "react-query";
import apiServices from "@/services/apiServices";
import { useRouter } from "next/router";
import { all } from "axios";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/utils";

const ProductDetail = () => {
  const router = useRouter();
  const { id: queryParam } = router.query;
  const { data: productData = {}, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["getProductById", queryParam],
    queryFn: ({ queryKey }) => apiServices.getProductById(queryKey[1]),
  });
  const { data: productsData = {}, isLoading: isLoadingProducts } = useQuery({
    queryKey: "getAllProducts",
    queryFn: () =>
      apiServices.getAllProducts({
        page: 0,
        limit: 8,
      }),
  });

  const { data: product = {} } = productData;
  const { data: { contents: allProducts = [] } = {} } = productsData;

  const handleClickAddToCart = async () => {
    const orderData = await apiServices.createOrder({
      productId: product.id,
      quantity: 1,
    });
    router.push("/cart");
    console.log("orderData", orderData);
  };

  const contentStyle = {
    height: "250px",
    color: "#fff",
    background: "#364d79",
  };
  return (
    <main>
      <div style={{ padding: "20px 0px" }} className="breadcrumb">
        <div
          style={{ fontSize: "14px", fontWeight: "400", color: "#01040D" }}
          className="container"
        >
          Home {">"} Product Details
        </div>
      </div>
      <div className="container">
        <div className="row">
          {isLoadingProduct ? (
            <Skeleton />
          ) : (
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
              <div className="carousel_product">
                  <Carousel autoplay>
                      {
                          product?.images?.split(',').map((image, index) => {
                              return (
                                  <div key={index}>
                                      <div style={contentStyle}>
                                          <img style={{width:"100%", height:"100%"}} src={image} alt={product.name} />
                                      </div>
                                  </div>
                              )
                          })
                      }
                  </Carousel>
              </div>
            </div>
          )}
          {isLoadingProduct ? (
            <Skeleton />
          ) : (
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
              <div className="d-flex justify-content-between">
                <h2
                  style={{
                    fontSize: "40px",
                    fontWeight: "700",
                    color: "#01040D",
                  }}
                >
                  {product.name}
                </h2>
                <button
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#01040D",
                    borderRadius: "12px",
                    border: "1px solid #01040D",
                    padding: "5px 28px",
                  }}
                >
                  Try-On
                </button>
              </div>
              <div
                className="mt-3"
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#07BFA5",
                }}
              >
                {formatPrice(product.price)} Paper Point
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#01040D",
                }}
              >
                {product.description}
              </p>
              <div className="mt-3 d-flex">
                <h4>
                  <b>Quantity In Stock:</b> {formatPrice(product.quantity)}
                </h4>
              </div>
              <div>
                <button
                  style={{
                    borderRadius: "16px",
                    background: "#07BFA5",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#fff",
                    padding: "21px 97px",
                  }}
                  className="mt-4"
                  onClick={handleClickAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <section
        style={{ paddingTop: "50px", background: "#F9FAFB", marginTop: "50px" }}
      >
        <div className="tabs d-flex container tabs_reponsive">
          <div className=" mt-3">
            <button
              style={{
                fontSize: "14px ",
                fontWeight: "500",
                color: "#01040D",
                border: "1px solid #01040D",
                padding: "7px 50px",
                borderRadius: "12px",
              }}
            >
              Details
            </button>
          </div>
          <div className="ms-4  mt-3">
            <button
              style={{
                fontSize: "14px ",
                fontWeight: "500",
                color: "#01040D",
                border: "1px solid #01040D",
                padding: "7px 50px",
                borderRadius: "12px",
              }}
            >
              Description
            </button>
          </div>
          <div className="ms-4  mt-3">
            <button
              style={{
                fontSize: "14px ",
                fontWeight: "500",
                color: "#01040D",
                border: "1px solid #01040D",
                padding: "7px 50px",
                borderRadius: "12px",
              }}
            >
              Reviews
            </button>
          </div>
        </div>
        <div className="container">
          <div>
            <div
              style={{ fontSize: "22px", fontWeight: "700", color: "#01040D" }}
              className="mt-4"
            >
              Reviews
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "16px",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="d-flex">
                    <div>AVT</div>
                    <div className="ms-5">
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#01040D",
                        }}
                      >
                        Emery Dias
                      </div>
                      <div className="mt-2">
                        <Start2 />
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000521",
                        }}
                      >
                        Great food! I have a great meal. <br /> Nice package
                      </p>
                      <div className="mt-3">img, img, img, img</div>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#8991A4",
                        textAlign: "end",
                      }}
                    >
                      Jul 07, 2021
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "16px",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="d-flex">
                    <div>AVT</div>
                    <div className="ms-5">
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#01040D",
                        }}
                      >
                        Emery Dias
                      </div>
                      <div className="mt-2">
                        <Start2 />
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000521",
                        }}
                      >
                        Great food! I have a great meal. <br /> Nice package
                      </p>
                      <div className="mt-3">img, img, img, img</div>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#8991A4",
                        textAlign: "end",
                      }}
                    >
                      Jul 07, 2021
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "50px",
                paddingBottom: "50px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#01221D",
              }}
            >
              Show All
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="title_section mb-5">You might also like</div>
          <div className="row pb-5 justify-content-between">
            {isLoadingProducts ? (
              <Skeleton />
            ) : (
              allProducts.map((product) => (
                <div key={product.id} className="box_flashSale col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mt-5 position-relative">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

ProductDetail.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ProductDetail;
