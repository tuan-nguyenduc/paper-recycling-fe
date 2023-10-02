/* eslint-disable @next/next/no-img-element */
import { SvgHeaderSignIn, CartButton, Message, Menu } from "./icon/SvgPage";
import ProfileModal from "@/components/ProfileModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PROFILE_STORAGE_KEY } from "@/constant/constant";
import { useUser } from "@/state/user";
import { Avatar, Button, Dropdown, Form, Input, message } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import apiServices from "@/services/apiServices";
import Link from "next/link";
// const handleMenuClick = (e) => {
//   message.info("Click on menu item.");
//   console.log("click", e);
// };

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [OpenMenu, setOpenMenu] = useState(false);
  const [responseSearch, setResponseSearch] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const router = useRouter();
  const { user, onSetUser, onClearUser } = useUser();

  const handleClickSignInButton = () => {
    router.push("/login");
  };

  const handleOnClickAvatar = () => {
    setOpenProfileModal(true);
  };
  const handleChangeOpenMenu = () => {
    setOpenMenu(!OpenMenu);
  };
  const dataSearchProduct = async () => {
    try {
      const response = await apiServices.getAllProducts({ q: searchProduct })
      setResponseSearch(response.data.contents)
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    router.push(`search?q=${searchProduct}`)
  }
  // const handleClickLogOutButton = () => {
  //   localStorage.removeItem(PROFILE_STORAGE_KEY);
  //   onClearUser();
  //   setIsLoggedIn(false);
  // }
  const items = [
    {
      label: <h1 style={{ fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: " 700" }}>Recent search</h1>
    },
    {
      label:
        <div className={!responseSearch[0] ? "d-none" : "tabsPage"}>
          <Link href={`search?q=${responseSearch[0]?.name}`}>
            <p className="title_itemDropdown" >{responseSearch[0]?.name}</p>
          </Link>
          <p className="title_itemDropdown">x</p>
        </div>,
      key: '0',
    },
    {
      label:
        <div className={!responseSearch[1] ? "d-none" : "tabsPage"}>
          <Link href={`search?q=${responseSearch[1]?.name}`}>
            <p className="title_itemDropdown" >{responseSearch[1]?.name}</p>
          </Link>
          <p onClick={() => setDeleteItem2(true)} className="title_itemDropdown">x</p>
        </div>,
      key: '1',
    },
    {
      label:
        <div className={!responseSearch[2] ? "d-none" : "tabsPage"}>
          <Link href={`search?q=${responseSearch[2]?.name}`}>
            <p className="title_itemDropdown" >{responseSearch[2]?.name}</p>
          </Link>
          <p onClick={() => setDeleteItem3(true)} className="title_itemDropdown">x</p>
        </div>,
      key: '3',
    },
  ];

  useEffect(() => {
    dataSearchProduct()
  }, [searchProduct])
  useEffect(() => {
    const token = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="header_top w-100 d-flex align-items-center">
            <div onClick={handleChangeOpenMenu} className="menu_reponsive">
              <Menu />
            </div>
            {OpenMenu ? (
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  background: "rgb(244, 245, 246)",
                  top: "30px",
                  zIndex: "999999",
                  borderRadius: "16px",
                }}
                className="menu_reponsive_topBar"
              >
                <ul>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    Categories
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    Pricing
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    Team
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      margin: "0px 20px",
                    }}
                  >
                    Blog
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}

            <div className="logo_page w-30">
              <SvgHeaderSignIn />
            </div>
            <div className="search_header w-40">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <form onSubmit={onSubmit}>
                    <input
                      style={{ background: "none", padding: "15px 50px", color: 'white' }}
                      className="input_elm w-100"
                      type="text"
                      placeholder="Search"
                      onChange={(e) => setSearchProduct(e.target.value)}
                    />
                  </form>
                </a>
              </Dropdown>
            </div>
            <SearchOutlined
              style={{
                fontSize: 25,
                margin: 16,
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                if (router.isReady) {
                  router.push(`/search?q=${inputSearch}`);
                }
              }}
            />

            <div className="account w-30 d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <span style={{ margin: "0px 10px", cursor: "pointer" }}>
                  <Message />
                </span>
                <span style={{ margin: "0px 10px", cursor: "pointer" }}>
                  {" "}
                  <button onClick={() => router.push("/cart")}>
                    <CartButton />
                  </button>
                </span>
              </div>
              <div>
                {isLoggedIn ? (
                  <div
                    onClick={handleOnClickAvatar}
                    className="d-flex align-items-center cursor-pointer account_rps"
                  >
                    <Avatar
                      shape="square"
                      size={36}
                      icon={
                        <img
                          src={user.avatar || "img/default_avatar.svg"}
                          alt=""
                        />
                      }
                    />
                    <div className="text-light mx-3">{user.name}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleClickSignInButton();
                      // setOpenProfileModal(true);
                    }}
                    style={{
                      border: "1px solid #fff",
                      borderRadius: "16px",
                      padding: "20px 40px",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                    className="text-white"
                    type="button"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="topBar">
            <nav>
              <ul
                style={{ margin: "15px 0px" }}
                className="text-white d-flex justify-content-center"
              >
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                >
                  Categories
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                >
                  Pricing
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                >
                  Team
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                >
                  Blog
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ProfileModal open={openProfileModal} setOpen={setOpenProfileModal} />
    </>
  );
};
export default Header;
