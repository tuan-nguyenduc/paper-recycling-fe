/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
    Confirmed,
    Photo,
    Start,
    Tracking,
    Video,
} from "@/components/icon/SvgPage";
import withAuth from "@/hocs/withAuth";
import AppLayout from "@/layouts/AppLayout";
import {LiaShippingFastSolid} from "react-icons/lia";
import {FcCancel} from "react-icons/fc";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";
import {formatPrice} from "@/utils";
import {allOrderStatus} from "@/constant/constant";
import {Skeleton} from "antd";
import toast from "react-hot-toast";

const Order = () => {
    const [orderStatus, setOrderStatus] = useState(allOrderStatus.SHIPPING)
    const {data: ordersData = {}, isLoading: isLoadingOrders, refetch: refetchOrders} = useQuery({
        queryKey: ["getAllOrders", orderStatus], queryFn: ({queryKey}) => apiServices.getAllOrders({
            status: queryKey[1]
        })
    })

    const {data: {contents: allOrders = []} = {}} = ordersData

    const showDeliveringOrders = () => {
        setOrderStatus(allOrderStatus.SHIPPING);
    }

    const showCompletedOrders = () => {
        setOrderStatus(allOrderStatus.COMPLETED);
    }

    const showCancelledOrders = () => {
        setOrderStatus(allOrderStatus.CANCELLED)
    }

    const handleConfirmOrder = async (id) => {
        const confirmOrderData = await apiServices.confirmOrder(id)
        await refetchOrders()
        console.log(confirmOrderData)
    }

    const submitConfirmOrder = async (id) => {
        toast.promise(handleConfirmOrder(id), {
            success: () => `Confirm your order successfully. Order code: ${id}`,
            loading: () => "Confirming your order...",
            error: (err) => `${err.message}`
        })
    }

    const handleCancelOrder = async (id) => {
        const cancelOrderData = await apiServices.cancelOrder(id)
        await refetchOrders()
        console.log(cancelOrderData)
    }

    const submitCancelOrder = async (id) => {
        toast.promise(handleCancelOrder(id), {
            success: () => `Cancel your order successfully. Order code: ${id}`,
            loading: () => "Cancelling your order...",
            error: (err) => `${err.message}`
        })
    }

    return (
        <main>
            <div id="order">
                <div style={{padding: "20px 0px"}} className="breadcrumb">
                    <div
                        style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
                        className="container"
                    >
                        Home {">"} Order
                    </div>
                </div>
                <div className="container">
                    <div className="title_section mb-3">Your Orders</div>
                    <section className="mainOrder size_container_elm">
                        <nav>
                            <ul className="d-flex justify-content-between mb-3">
                                <li key={1}>
                                    <LiaShippingFastSolid
                                        style={{
                                            width: "40",
                                            height: "40",
                                            viewBox: "0 0 40 40",
                                            margin: " 0 auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => showDeliveringOrders()}
                                    />
                                    <p
                                        style={orderStatus === allOrderStatus.SHIPPING ? {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "bold"
                                        } : {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "400"
                                        }}
                                    >
                                        Delivering
                                    </p>
                                </li>
                                <li key={2}>
                                    <div onClick={() => showCompletedOrders()}><Confirmed/></div>

                                    <p
                                        style={orderStatus === allOrderStatus.COMPLETED ? {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "bold"
                                        } : {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "400"
                                        }}
                                    >
                                        Completed
                                    </p>
                                </li>
                                <li key={3}>
                                    <FcCancel
                                        style={{
                                            width: "40",
                                            height: "40",
                                            viewBox: "0 0 40 40",
                                            margin: " 0 auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => showCancelledOrders()}
                                    />
                                    <p
                                        style={orderStatus === allOrderStatus.CANCELLED ? {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "bold"
                                        } : {
                                            fontSize: "12px",
                                            marginTop: "10px",
                                            fontWeight: "400"
                                        }}
                                    >
                                        Cancelled
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </section>
                    {isLoadingOrders ? <Skeleton/> :
                        allOrders.length === 0 ? <div>No order found...</div> :
                            allOrders.map((order) => {
                                return (
                                    <section className="productOrder size_container_elm" key={order.id}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="title_elm">Shop Name</div>
                                            <div>
                                                <button
                                                    style={{
                                                        padding: "6px 12px 6px 12px",
                                                        borderRadius: "8px",
                                                        background: "#07BFA51A",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        color: "#07BFA5",
                                                    }}
                                                    type="button"
                                                >
                                                    Order Code: {order.id}
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            order?.orderDetails?.map((orderItem) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-3"
                                                         key={order.orderDetails?.id}>
                                                        <img src={orderItem?.product?.images.split(',')[0]} alt={orderItem?.product?.name}
                                                             width={60} height={60}/>
                                                        <span
                                                            style={{
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                                color: "#01221D",
                                                                marginLeft: "20px",
                                                            }}
                                                        >
                                                            {orderItem.product.name} <b>{` x${orderItem.quantity}`}</b>
              </span>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="moreProducts">
                                            <button>More products</button>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
              <span
                  style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#01221D",
                  }}
              >
                {order.orderDetails.length} products
              </span>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#01221D",
                                                }}
                                            >
                {formatPrice(order.amount)} Paper Point
              </span>
                                        </div>
                                        {
                                            orderStatus === allOrderStatus.SHIPPING ? <div>
                                                <button
                                                    style={{
                                                        background: "#01040D",
                                                        color: "#fff",
                                                        width: "100%",
                                                        padding: "20px",
                                                        borderRadius: "15px",
                                                        marginTop: "30px",
                                                    }}
                                                    onClick={() => submitConfirmOrder(order.id)}
                                                >
                                                    Received
                                                </button>
                                                <button
                                                    style={{
                                                        background: "#F4F5F6",
                                                        color: "#01040D",
                                                        width: "100%",
                                                        padding: "20px",
                                                        borderRadius: "15px",
                                                        marginTop: "30px",
                                                    }}
                                                    onClick={() => submitCancelOrder(order.id)}
                                                >
                                                    Cancelled
                                                </button>
                                            </div> : <div></div>
                                        }
                                    </section>
                                )
                            })
                    }

                </div>
            </div>
        </main>
    );
};

const OrderWithAuth = withAuth(Order);
OrderWithAuth.getLayout = (page) => (<AppLayout>{page}</AppLayout>)

export default OrderWithAuth;
