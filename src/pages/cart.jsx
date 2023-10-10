/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import withAuth from "@/hocs/withAuth";
import {ArrowLeft} from "@/components/icon/SvgPage";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {Input, InputNumber, Skeleton} from "antd";
import {formatPrice} from "@/utils";
import {useEffect, useState} from "react";
import Link from "next/link";
import {DeleteOutlined, LeftOutlined} from "@ant-design/icons";
import {log} from "next/dist/server/typescript/utils";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

const Cart = () => {
    const router = useRouter()
    const {data: ordersData = {}, isLoading: isLoadingCart, refetch: refetchOrders} = useQuery({
        queryKey: ["getAllOrders"], queryFn: ({queryKey}) => apiServices.getAllOrders({
            status: 1
        })
    })
    const {data: {contents: allOrders = []} = {}} = ordersData;

    let createdOrder = []
    //flat orderDetails
    allOrders.forEach((order) => {
        createdOrder = createdOrder.concat(order.orderDetails)
    })

    console.log("allOrders", allOrders)
    let totalPrice = 0;
    createdOrder.forEach((orderItem) => {
        totalPrice = totalPrice + orderItem.price * orderItem.quantity
    })

    const handleDeleteItem = async (item) => {
        try {
            const updateOrderData = await apiServices.updateOrderById(item.orderId, {
                "productId": item.productId,
                "quantity": 0
            })
            console.log(updateOrderData)
            await refetchOrders();
        } catch (err) {
            throw new Error(err)
        }

    }

    const handleChangeQuantityItem = async (value, item) => {
        try {
            if (value !== null) {
                const updateOrderData = await apiServices.updateOrderById(item.orderId, {
                    "productId": item.productId,
                    "quantity": value
                })
                console.log(updateOrderData)
                await refetchOrders()
            }
        } catch (err) {
            throw new Error(err.message)
        }

    }
    console.log(createdOrder)

    const handleCheckOut = async () => {
        try {
            let orderId = 0;
            allOrders.forEach((order) => {
                if (order.status === 1) {
                    orderId = order.id;
                }
            })
            const checkOutData = await apiServices.purchaseOrder(orderId)
            await refetchOrders()
            router.push('/order')
        } catch (err) {
            throw new Error(err.message);
        }

    }

    const handleSubmitCheckOut = () => {
        toast.promise(handleCheckOut(), {
            success: () => {
                return "Purchased successfully!"
            },
            loading: "Purchasing...",
            error: (err) => {
                return `${err.message}`
            }
        })
    }

    const handleClearAllOrder = async () => {
        createdOrder.map(async (order) => {
            const deletedData = await apiServices.updateOrderById(order.orderId, {
                "productId": order.productId,
                "quantity": 0,
            })
            await refetchOrders()
            console.log(deletedData)
        })
    }

    return (
        <div id="cart">
            <div className="container">
                <div className="row">
                    <div
                        className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex justify-content-between align-items-center">
                        <div
                            style={{fontSize: "22px", fontWeight: "700", color: "#01040D"}}
                        >
                            Cart
                        </div>
                        <div>
                            <button
                                style={{
                                    border: "1px solid red",
                                    borderRadius: "12px",
                                    padding: "2px 16px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: "red",
                                }}
                                onClick={() => handleClearAllOrder()}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {isLoadingCart ? <Skeleton/>
                            :
                            createdOrder.length === 0 ? <h1>Your cart has no products...</h1>
                                :
                                createdOrder.map(orderItem => {
                                    return (
                                        <div className="box-cart" key={orderItem.id}>
                                            <div className="d-flex align-items-center">
                                                <img src={orderItem.product.images.split(',')[0]} alt={orderItem.product.name}
                                                     style={{
                                                         width: 120,
                                                         height: 120
                                                     }}/>
                                                <div
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        color: "#01221D",
                                                    }}
                                                    className="ms-3"
                                                >
                                                    {orderItem.product.name}
                                                </div>
                                                <div style={{padding: 20}}>
                                                    <h3>Quantity: </h3>
                                                    <InputNumber
                                                        min={0}
                                                        max={orderItem.product.quantity}
                                                        step={1}
                                                        style={{
                                                            width: '40%',
                                                        }}
                                                        size={"small"}
                                                        defaultValue={orderItem.quantity}
                                                        onChange={(value) => handleChangeQuantityItem(value, orderItem)}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#01040D",
                                                }}
                                            >
                                                {formatPrice(orderItem.product.price * orderItem.quantity)} PP
                                            </div>
                                            <button
                                                onClick={() => handleDeleteItem(orderItem)}
                                            >
                                                <DeleteOutlined
                                                    style={{color: 'red'}}
                                                />
                                            </button>
                                        </div>
                                    )
                                })
                        }
                        <Link
                            style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "40px",
                                display: "flex",
                                alignItems: "center",
                            }}
                            href='/'


                        >
                            <LeftOutlined/>
                            <span className="ms-2">Continue Shopping</span>
                        </Link>
                    </div>


                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="order_summary">
                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "700",
                                    color: "#01040D",
                                }}
                            >
                                Order Summary
                            </div>
                            <p
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#01040D",
                                    marginTop: "20px",
                                }}
                            >
                                Price
                            </p>
                            <nav>
                                <ul>
                                    <li
                                        className="d-flex justify-content-between"
                                        style={{marginTop: "16px"}}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#01221D",
                                            }}
                                        >
                                            Subtotal
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#01040D",
                                            }}
                                        >
                                            {formatPrice(totalPrice)} Paper Point
                                        </div>
                                    </li>
                                    <li
                                        className="d-flex justify-content-between"
                                        style={{marginTop: "16px"}}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#01221D",
                                            }}
                                        >
                                            Shipping Fee
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#01040D",
                                            }}
                                        >
                                            0.00 Paper Point
                                        </div>
                                    </li>
                                    <li
                                        className="d-flex justify-content-between"
                                        style={{marginTop: "16px"}}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#01221D",
                                            }}
                                        >
                                            Coupon
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#01040D",
                                            }}
                                        >
                                            0.00 Paper Point
                                        </div>
                                    </li>
                                    <li className="line_cart"></li>
                                    <li
                                        className="d-flex justify-content-between"
                                        style={{marginTop: "16px"}}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#01221D",
                                            }}
                                        >
                                            Order Total
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "700",
                                                color: "#01040D",
                                            }}
                                        >
                                            {formatPrice(totalPrice)} Paper Point
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                            <div className="position-relative" style={{marginTop: "24px"}}>
                                <input
                                    style={{
                                        border: "1px solid #8991A4",
                                        borderRadius: "12px",
                                        width: "100%",
                                        padding: "15px 16px",
                                        opacity: "30%",
                                    }}
                                    placeholder="Enter a promo code"
                                    type="text"
                                />
                                <button
                                    style={{
                                        border: "1px solid #01040D",
                                        borderRadius: "12px",
                                        position: "absolute",
                                        padding: "16px 46px",
                                        right: "0px",
                                        color: "#01040D",
                                        fontSize: "15px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                            <div style={{marginTop: "40px"}}>
                                <button
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        color: "#FFFFFF",
                                        borderRadius: "16px",
                                        background: "#01040D",
                                        width: "100%",
                                        padding: "20px 0px",
                                    }}
                                    onClick={() => handleSubmitCheckOut()}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const CartWithAuth = withAuth(Cart);
CartWithAuth.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default CartWithAuth;