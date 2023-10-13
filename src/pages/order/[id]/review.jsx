/* eslint-disable @next/next/no-img-element */
import {useState} from "react";
import withAuth from "@/hocs/withAuth";
import AppLayout from "@/layouts/AppLayout";
import Column from "antd/lib/table/Column";
import {DEFAULT_AVATAR_IMG} from "@/constant/constant";
import {Col, Form, Image, Rate} from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {useForm} from "antd/lib/form/Form";
import toast from "react-hot-toast";

const Review = () => {
    const [form] = useForm();
    const [isUploadingReview, setIsUploadingReview] = useState(false);
    const router = useRouter();
    const {id: queryParam} = router.query;
    const {data: productData = {}, isLoading: isLoadingProduct} = useQuery({
        queryKey: ["getProductById", queryParam],
        queryFn: ({queryKey}) => apiServices.getProductById(queryKey[1]),
    });
    const {data: product = {}} = productData;
    console.log("router", router);

    const uploadReview = async (values) => {
        try {
            setIsUploadingReview(true);
            const reviewData = await apiServices.createReview({
                ...values,
                productId: queryParam,
            });
        } catch (err) {
            throw new Error(err.message)
        } finally {
            setIsUploadingReview(false)
            form.resetFields()
        }
    }

    const onUploadReview = async (values) => {
        await toast.promise(uploadReview(values), {
            success: () => "Uploaded your [id] successfully!",
            loading: () => "Uploading your [id]...",
            error: (err) => `${err.message}`
        })
    }
    return (
        <main>
            <div id="review">
                <div style={{padding: "20px 0px"}} className="breadcrumb">
                    <div
                        style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
                        className="container"
                    >
                        Home {">"} Order {">"} Review Product
                    </div>
                </div>
                <div className="container">
                    <div
                        style={{
                            fontSize: "24px", fontWeight: "700", color: "#01040D",
                        }}
                    >
                        Review Product
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Col>
                            <Image
                                width={160}
                                src={product?.images?.split(',')[0]}
                                alt="test"
                            />
                            <Title className='mt-3' level={4}>{product?.name}</Title>
                            <Form
                                form={form}
                                onFinish={(values) => onUploadReview(values)}
                            >
                                <Form.Item name='rating'>
                                    <Rate className='mt-3' defaultValue={0} style={{fontSize: 40,}}/>
                                </Form.Item>
                                <Form.Item name='content'>
                                    <div className='mt-5'>
                                        <TextArea style={{width: '50%', resize: 'none'}} rows={6}
                                                  placeholder="Write your review..." maxLength={120} showCount/>
                                    </div>
                                </Form.Item>
                            </Form>

                            <button
                                style={{
                                    background: "#01040D",
                                    color: "#fff",
                                    width: "30%",
                                    padding: "20px",
                                    borderRadius: "15px",
                                    marginTop: "50px",
                                }}
                                onClick={() => {
                                    form.submit()
                                }}
                                disabled={isUploadingReview}
                            >
                                {isUploadingReview ? "Uploading..." : "Upload Review"}
                            </button>
                        </Col>
                    </div>


                </div>
            </div>
        </main>
    );
};

const OrderWithAuth = withAuth(Review);
OrderWithAuth.getLayout = (page) => (<AppLayout>{page}</AppLayout>)

export default OrderWithAuth;
