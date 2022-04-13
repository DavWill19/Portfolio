import React from "react";
import { withRouter, Link, useParams, useLocation } from "react-router-dom";
import { Navigation } from "./navigation";
import { Container, Card, Row, Col, Button, Stack } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from 'react-paginate';

export function Dashboard() {
    const { state } = useLocation();
    const self = state.user
    const [user, setUser] = React.useState(state.user);
    const [userData, setData] = React.useState([]);
    const token = localStorage.getItem("token");
    const [toggle, setToggle] = React.useState(false);
    const [userIndex, setUserIndex] = React.useState();
    const [coins, setCoins] = React.useState(0);
    const history = user.history

    const userHistory = userData.filter(user => user.history).map(user => user.history).reduce((a, b) => a.concat(b), []).filter(user => user.action[0] === "P");
    //show by date
    const sortedHistory = history.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    });
    console.log("sortedHistory", sortedHistory.length);

    function coin(cost) {
        if (cost > 1) {
            return (
                `${cost} Crew Coins`
            )
        } else {
            return (
                `${cost} Crew Coin`
            )
        }
    }

    function quickAddCoins(id) {
        let text = `Are you sure you want to add ${coins} Crew Coins to your account?`;;
        if (window.confirm(text)) {
            fetch(`https://crewcoin.herokuapp.com/crewuser/quickadd/${id}`, {
                method: "PUT",
                headers: {
                    //bearer token
                    authorization: `bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify({
                    "coinincrease": coins,
                    "history": {
                        "date": new Date(),
                        "action": "Added",
                        "amount": coins,
                        "comments": "Quick Add",
                        "who": "from Crew-Coin.com"
                    },
                }),
            })

                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setUser(res.crewuser);
                        setCoins(0);
                        alert(`${coin(coins)} Crew Coins added to account!`);
                        window.location.reload();
                    } else {
                        alert("Please check internet connection!")
                    }
                })
                .catch(err => {
                    alert("Error")
                }
                );

        }

    }

    function Items({ currentItems }) {

        if (sortedHistory && sortedHistory.length > 0) {
            return (
                <>
                    {currentItems &&
                        currentItems.map((item, i) => (
                            <div key={i} className="row text-center px-5" >
                                <div className="border col-xs-12 col-sm-8 col-sm-offset-2 mb-2 ms-auto" key={i}>
                                    <Stack className="mx-auto" >
                                        <p><strong>{`${item.action} ${coin(item.amount)} ${item.who}`}</strong></p>
                                        <p>{`Comments: "${item.comments}"`}</p>
                                        <p><strong>{moment(item.date).format("MM/DD/YYYY")}</strong></p>
                                    </Stack>
                                </div>
                            </div>
                        ))}
                </>
            )
        } else {
            return (
                <div className="row text-center px-5" >
                    <div className="border col-xs- col-sm-8 col-sm-offset-2 mb-2 ms-auto">
                        <Stack className="mx-auto" >
                            <p><i>No transactions yet</i></p>
                        </Stack>
                    </div>
                </div>
            )
        }
    }
    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        let items = sortedHistory;
        const [currentItems, setCurrentItems] = React.useState(null);
        const [pageCount, setPageCount] = React.useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = React.useState(0);

        React.useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    itemsPerPage={itemsPerPage}
                />
            </>
        );
    }

    function purchaseHistory() {

        function findUserByEmail(email) {
            const userObject = userData.find(user => user.username === email)
            return (userObject.firstname + " " + userObject.lastname)

        }
        const sortedHistory = userHistory.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        if (userHistory && userHistory.length > 0) {
            return (
                sortedHistory.map((item, i) => {
                    return (
                        <div key={i} className="row text-center px-5" >
                            <div className="border col-xs- col-sm-8 col-sm-offset-2 mb-2 ms-auto" key={i}>
                                <Stack className="mx-auto" >
                                    <p><strong>{`${findUserByEmail(item.userEmail)}`}</strong></p>
                                    <p>{item.action} {coin(item.amount)}</p>
                                    <p><strong>{moment(item.date).format("MM/DD/YYYY")}</strong></p>
                                </Stack>
                            </div>
                        </div>

                    )
                }))
        } else {
            return (
                <div className="row text-center px-5" >
                    <div className="border col-xs- col-sm-8 col-sm-offset-2 mb-2 ms-auto">
                        <Stack className="mx-auto" >
                            <p><i>No purchases yet</i></p>
                        </Stack>
                    </div>
                </div>
            )
        }
    }
    function setAdmin(user, admin) {
        let text = `Are you sure you want to change admin priveleges?`;
        let privelege = admin;
        if (window.confirm(text)) {
            fetch(`https://crewcoin.herokuapp.com/crewuser/changeadmin/${user}`, {
                method: "PUT",
                headers: {
                    //bearer token
                    authorization: `bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify({
                    "admin": privelege,
                }),
            })

                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        alert(`Admin status changed!`);
                        window.location.reload();
                    } else {
                        alert("Please check internet connection!")
                    }
                })
                .catch(err => {
                    alert("Error")
                }
                );
        }

    }

    function deleteUser(id, user) {
        let text = `Are you sure you want to delete ${user}? This action cannot be undone!`;
        if (window.confirm(text)) {
            fetch(`https://crewcoin.herokuapp.com/crewuser/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${token}`,
                    credentials: "same-origin",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    mode: "cors"
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {

                        alert(
                            `${res.status}`
                        );
                    }
                })
                .catch(err => {
                    alert(
                        'Something went wrong!'
                    );
                }
                )
            fetch(`https://crewcoin.herokuapp.com/crewuser/${user.portalId}`, {
                method: "GET",
                headers: {
                    authorization: `bearer ${token}`,
                    credentials: "same-origin",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    mode: "cors"
                },
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        setData(res);
                    } else {
                        alert("Error fetching user data. Please try again.")
                    }
                })
                .catch(err => {
                    console.log(err);
                }
                );
        }

    }






    React.useEffect(() => {
        fetch(`https://crewcoin.herokuapp.com/crewuser/${user.portalId}`, {
            method: "GET",
            headers: {
                authorization: `bearer ${token}`,
                credentials: "same-origin",
                Accept: "application/json",
                "Content-Type": "application/json",
                mode: "cors"
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    setData(res);
                    const myself = res.find(user => user.username === self.username);
                    setUser(myself);
                } else {
                    alert("Error fetching user data. Please try again.")
                }
            })
            .catch(err => {
                console.log(err);
            }
            );

    }, []);
    if (user.admin === true) {
        return (
            <div>
                <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button
                                type='button'
                                className='navbar-toggle collapsed'
                                data-toggle='collapse'
                                data-target='#bs-example-navbar-collapse-1'
                            >
                                {' '}
                                <span className='sr-only'>Toggle navigation</span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                            </button>
                        </div>

                        <div
                            className='collapse navbar-collapse'
                            id='bs-example-navbar-collapse-1'
                        >
                            <ul className='nav navbar-nav navbar-left'>

                                <li>
                                    <Link to="/">`
                                        <img alt="crewcoinlogo" className="crewcoinSm" src={'../img/crewcoinlogo.png'} />
                                    </Link>
                                </li>
                                <li>

                                </li>
                            </ul>
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to="/">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Container className="mt-5 pt-5" >

                    <div className='col-sm-8 col-sm-offset-2 text-center mt-5'>
                        <h3 className="">{user.firstname}, Welcome  to your Dashboard!</h3>
                    </div>
                </Container>
                <Container >
                    <div className='col-sm-8 col-sm-offset-2 text-center mt-5'>
                        <Card className="">
                            <Card.Body>
                                <Card.Title>
                                    <h2>{user.organization} </h2>
                                    <hr className="hr3" />
                                </Card.Title>
                                <Card.Text>
                                    <h4>PortalId: {user.portalId}</h4>
                                    <h4>Balance: {user.balance}</h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
                <Container className="mt-2 borderRound shadow limitHeight" >
                    <div className='col-sm-12 text-center mt-5 pb-5 limitHeight'>
                        <h3 className="text-center">Current Users: </h3>
                        <hr />
                        <div className='mb-5 text-center'>
                            <Container>
                                <Stack direction="horizontal" gap={2}>

                                    <div className="bg-light ms-auto col-sm-10"><h5> User</h5><hr className="hr2" /></div>
                                    <div className="bg-light col-sm-10 mx-2"><h5>Status</h5> <hr className="hr2" /></div>
                                </Stack>
                            </Container>
                            {userData.map((user, i) => {
                                function checkAdmin(user) {
                                    if (user.username === self.username) {
                                        return null;
                                    } else {

                                        if (!user.admin) {
                                            return (
                                                <Button size="xs" className="btn btn-danger shadow" onClick={() => { setAdmin(user._id, user.admin) }}>Make Admin</Button>
                                            )
                                        } else {
                                            return (
                                                <Button size="xs" className="btn btn-danger shadow" onClick={() => { setAdmin(user._id, user.admin) }}>Remove Admin Status</Button>
                                            )
                                        }
                                    }
                                }

                                function showUserInfo(user, i) {
                                    if (toggle === true && userData[i] === user[userIndex]) {
                                        return (
                                            <Stack direction="horizontal" gap={2}>
                                                <div className="col-xs-12 mt-2 ">
                                                    <div className="bg-light ms-auto ">
                                                        <p><strong>Phone:</strong> {user[i].phone}</p>
                                                    </div>
                                                    <div className="bg-light ms-auto ">
                                                        <p><strong>Email:</strong> {user[i].username}</p>
                                                    </div>
                                                    <div className="bg-light ms-auto ">
                                                        <p><strong>Balance:</strong> {user[i].balance}</p>
                                                    </div>
                                                    <div className="bg-light ms-auto ">
                                                        <p><strong>Joined:</strong> {moment(user[i].createdAt).format("MM/DD/YYYY")}</p>
                                                    </div>
                                                    <div>
                                                        {checkAdmin(user[i])}


                                                    </div>
                                                </div>
                                            </Stack>
                                        )
                                    } else {
                                        return null
                                    }

                                }
                                function admin() {
                                    if (user.admin === true) {
                                        return "Admin"
                                    } else {
                                        return "User"
                                    }
                                }
                                function buttonVariant() {
                                    if (user.username === self.username) {
                                        return "ghost"
                                    } else {
                                        return "danger"
                                    }
                                }
                                return (
                                    <Container key={i} className="mt-1" >
                                        <div className='col-sm-8 col-sm-offset-2 text-center mt-5'>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button key={i} size="xs" variant="info" className="mb-1 shadow" onClick={() => { setToggle(!toggle); setUserIndex(i) }}  >+</Button>
                                                <div className="bg-light ms-auto "><FontAwesomeIcon icon="fa-regular fa-user" /> <strong>{user.firstname} {user.lastname}</strong></div>
                                                <div className="bg-light px-3">{admin()}</div>
                                                <div className="bg-light">
                                                    <Button onClick={() => {
                                                        if (user.username === self.username) {
                                                            return null
                                                        } else {
                                                            deleteUser(user._id, user.firstname + " " + user.lastname)
                                                        }
                                                    }}
                                                        key={user}
                                                        size="xs"
                                                        variant={
                                                            buttonVariant(user.username)
                                                        }
                                                        className="mb-1 shadow"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Stack>
                                            {showUserInfo(userData, i)}
                                        </div>
                                    </Container>

                                )
                            })}
                        </div>
                    </div>
                </Container>
                <Container className="mt-5 pt-5" >
                    <div className='col-sm-12 text-center mt-5 pb-5 limitHeight shadow borderRound'>
                        <h3>My Transaction History</h3>
                        <hr />
                        <p>View your transaction history</p>

                        <PaginatedItems itemsPerPage={10} />

                    </div>
                </Container>
                <Container className="mt-5 pt-5" >
                    <div className='col-sm-12 text-center mt-5 pb-5 limitHeight shadow borderRound'>
                        <h3>Organization Purchase History</h3>
                        <hr />
                        <p>View purchase history</p>
                        {purchaseHistory()}


                    </div>
                </Container>
                <Container className="mt-2 pt-2" >
                    <div className='col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center mt-5 shadow borderRound'>
                        <h3>Quick Add</h3>
                        <hr />
                        <p>Need Crew Coins?</p>
                        <form className="mb-5">
                            <div className="form-group px-5">
                                <input
                                    min="0"
                                    value={coins}
                                    onChange={(value) => { setCoins(Number(value.target.value)) }}
                                    type="number"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Amount"

                                />
                            </div>
                            <Button onClick={() => quickAddCoins(user._id)} size="sm" variant="warning" className="mb-1"  >Add Coins</Button>
                        </form>
                    </div>
                </Container>
                <div id='footer' className="border mt-5">
                    <div className='container text-center'>
                        <p>
                            &copy; 2022 Crew Coin. All Rights Reserved.
                        </p>
                    </div>
                </div>

            </div>
        );
    }
    else {
        return (
            <div>
                <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button
                                type='button'
                                className='navbar-toggle collapsed'
                                data-toggle='collapse'
                                data-target='#bs-example-navbar-collapse-1'
                            >
                                {' '}
                                <span className='sr-only'>Toggle navigation</span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                            </button>
                        </div>

                        <div
                            className='collapse navbar-collapse'
                            id='bs-example-navbar-collapse-1'
                        >
                            <ul className='nav navbar-nav navbar-left'>

                                <li>
                                    <img alt="crewcoinlogo" className="crewcoinSm" src={'../img/crewcoinlogo.png'} />
                                </li>
                                <li>

                                </li>
                            </ul>
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to="/">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Container className="mt-5 pt-5" >

                    <div className='col-sm-8 col-sm-offset-2 text-center mt-5'>
                        <h1 className="">{user.firstname}, Welcome  to your Dashboard!</h1>
                    </div>
                </Container>
                <Container className="mt-2 pt-2" >
                    <div className='col-sm-8 col-sm-offset-2 text-center mt-5'>
                        <Card className="">
                            <Card.Body>
                                <Card.Title>
                                    <h2>{user.organization} </h2>
                                </Card.Title>
                                <Card.Text>
                                    <h4>PortalId: {user.portalId}</h4>
                                    <h4>Balance: {user.balance}</h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
                <Container className="mt-5 pt-5" >
                    <div className='col-sm-12 text-center mt-5 pb-5 limitHeight shadow borderRound'>
                        <h3>My Transaction History</h3>
                        <hr />
                        <p>View your transaction history</p>

                        <PaginatedItems itemsPerPage={10} />

                    </div>
                </Container>
                <div id='footer'>
                    <div className='container text-center'>
                        <p>
                            &copy; 2022 Crew Coin. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
