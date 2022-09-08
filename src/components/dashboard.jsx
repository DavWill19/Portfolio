import React from "react";
import { withRouter, Link, useParams, useLocation } from "react-router-dom";
import { Navigation } from "./navigation";
import { Container, Card, Row, Col, Button, Stack } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from 'react-paginate';
import PullToRefresh from 'react-simple-pull-to-refresh';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import AnimateHeight from 'react-animate-height';

initializeApp(firebaseConfig);


export function Dashboard() {
    const { state } = useLocation();
    const [self, setSelf] = React.useState(state.user);
    const [user, setUser] = React.useState(state.user);
    const [prizes, setPrizes] = React.useState([]);
    const [editPrize, setEditPrize] = React.useState({});
    const [userData, setData] = React.useState([]);
    const token = localStorage.getItem("token");
    const [toggle, setToggle] = React.useState(false);
    const [userIndex, setUserIndex] = React.useState();
    const [coins, setCoins] = React.useState(0);
    const [budget, setBudget] = React.useState(user.budgetAmount);
    const [height, setHeight] = React.useState(0);
    const [transHeight, setTransHeight] = React.useState(0);
    const [historyHeight, setHistoryHeight] = React.useState(0);
    const history = user.history

    // * Function to sort alphabetically an array of objects by some specific key.
    function dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }
    let sorted = prizes.sort(dynamicSort("title"));


    const userHistory = userData.filter(user => user.history).map(user => user.history).reduce((a, b) => a.concat(b), []).filter(user => user.action[0] === "P");
    //show by date
    const sortedHistory = history.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
    });
    console.log("sortedHistory", sortedHistory.length);

    function coin(cost) {
        if (cost !== 1) {
            return (
                `${cost} Crew Coins`

            )
        } else {
            return (
                `${cost} Crew Coin`
            )
        }
    }
    function buttonToggle(height) {
        if (height === "auto" || height === true) {
            return "-"
        } else {
            return "+"
        }
    }


    function handleRefresh() {
        window.location.reload();
    }


    function quickAddCoins(id) {
        let text = `Are you sure you want to add ${coin(coins)} to your account?`;;
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
    function addBudget(id) {

        let currentBudget = () => {
            if (budget > 0) {
                return (
                    true
                )
            } else
                return (
                    false
                )
        }

        fetch(`https://crewcoin.herokuapp.com/crewuser/addbudget/${id}`, {
            method: "PUT",
            headers: {
                //bearer token
                authorization: `bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                mode: "cors"
            },
            body: JSON.stringify({
                budgetAmount: budget,
                budget: currentBudget(),
                "history": {
                    "date": new Date(),
                    "action": "Added monthly schedule of",
                    "amount": budget,
                    "comments": "Set Monthly Budget",
                    "who": "from Crew-Coin.com"
                },
            }),
        })

            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setUser(res.crewuser);
                    setSelf(res.crewuser);
                    setBudget(res.crewuser.budgetAmount)
                    alert(`Budget of ${coin(budget)} added to account!`);
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


    function Items({ currentItems }) {

        if (sortedHistory && sortedHistory.length > 0) {
            return (
                <>
                    {currentItems &&
                        currentItems.map((item, i) => (
                            <div key={i} className="row text-center px-5" >
                                <div className="border col-xs-12 my-2 col-sm-12 mb-2 ms-auto" key={i}>
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
                    <div className="border mt-5 col-xs-8 col-sm-8 col-sm-offset-2 mb-2 ms-auto">
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
                    marginPagesDisplayed={10}
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
                            <div className="border col-xs-12 col-sm-12 mb-2 ms-auto" key={i}>
                                <Stack className="mx-auto" >
                                    <p><strong>{`${findUserByEmail(item.userEmail)}`}</strong></p>
                                    <p className="marginSmall">{item.action} {coin(item.amount)}</p>
                                    <p><strong>{moment(item.date).format("MM/DD/YYYY")}</strong></p>
                                </Stack>
                            </div>
                        </div>

                    )
                }))
        } else {
            return (
                <div className="row text-center px-5" >
                    <div className="border mt-5 col-xs-8 col-sm-8 col-sm-offset-2 mb-2 ms-auto">
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
        fetch(`https://crewcoin.herokuapp.com/store/${user.portalId}`, {
            method: "GET",
            headers: {
                authorization: "jwt",
                credentials: "same-origin",
                Accept: "application/json, text/html, */*",
                "Content-Type": "application/json",
                mode: "cors"
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setPrizes(res.prizes);
                    console.log(prizes);
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
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title text-center" id="exampleModalLabel">Monthly Budget</h2>
                                <hr />
                                <p className="text-center">Need Help Controlling Your Spending?</p>
                            </div>
                            <div class="modal-body">
                                <img alt="crewcoingif" className="crewCoinGif" src={'../img/coinIcon2.gif'} />
                                <h3 className="text-center">Set Your Monthly Budget</h3>
                                <form className="width-35 mx-auto">
                                    <div className="form-group mx-auto px-5">
                                        <input
                                            width="50%"
                                            min="0"
                                            value={budget}
                                            defaultValue={user.budgetAmount}
                                            onChange={(value) => { setBudget(Number(value.target.value)) }}
                                            type="number"
                                            className="form-control text-center justify-content-center"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Amount"

                                        />
                                    </div>
                                </form>
                                <p className="text-center">Crew Coins will be added on the 1st of every month!</p>
                            </div>
                            <div class="modal-footer">
                                <div className="modalBudget">
                                    <h5 className="budgetModal">*Budget: {user.budgetAmount}</h5>
                                </div>
                                <button onClick={() => setBudget(user.budgetAmount)} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button onClick={() => addBudget(self._id)} type="button" class="btn btn-warning">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* quickadd modal */}
                <div class="modal fade" id="quickAddModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title text-center" id="exampleModalLabel">Add Crew Coins</h2>
                                <hr />
                                <p className="text-center">Need Crew Coins now?</p>
                            </div>
                            <div class="modal-body">
                                <img alt="crewcoingif" className="crewCoinGif" src={'../img/coinIcon2.gif'} />
                                <h3 className="text-center">Increase Your Balance</h3>
                                <form className="width-35 mx-auto">
                                    <div className="form-group mx-auto px-5">
                                        <input

                                            min="0"
                                            defaultValue={coins}
                                            onChange={(value) => { setCoins(Number(value.target.value)) }}
                                            type="number"
                                            className="form-control text-center justify-content-center"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Amount"

                                        />
                                    </div>
                                </form>
                                <p className="text-center">Instantly add Crew Coins to your account!</p>
                            </div>
                            <div class="modal-footer">
                                <div className="modalBudget">
                                    <h5 className="budgetModal">*Balance: {user.balance}</h5>
                                </div>
                                <button onClick={() => setBudget(user.budgetAmount)} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <Button onClick={() => quickAddCoins(self._id)} size="sm" variant="warning" className="mb-1"  >Add Coins</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <PullToRefresh onRefresh={handleRefresh}>
                    <nav id='menu' className='navbar  navbar-default navbar-fixed-top'>
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
                                <ul className='navbar-nav navbar-left'>

                                    <li>
                                        <Link to="/">`
                                            <img alt="crewcoinlogo" className="crewcoinSm" src={'../img/crewcoinlogo.png'} />
                                        </Link>
                                    </li>
                                </ul>

                            </div>

                            <div
                                className='collapse navbar-collapse'
                                id='bs-example-navbar-collapse-1'
                            >
                                <ul className='nav navbar-nav navbar-right'>
                                    <li>
                                        <Link to="/">Logout</Link>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </nav>
                    <br />
                    <Container className="mt-5 pt-5">
                        <Button data-toggle="modal" data-target="#quickAddModal" variant="warning" className="pull-right mt-5 mx-2 py-1 shadow" >ADD COINS</Button>

                        <Button data-toggle="modal" data-target="#exampleModal" variant="warning" className="pull-right mt-5 py-1 shadow mx-2" >SET BUDGET</Button>
                    </Container>
                    <Container>
                        <h3 className="mt-5 text-center">{user.firstname}, Welcome to your Dashboard!</h3>
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
                                                    <Button size="xs" className="btn btn-warning shadow" onClick={() => { setAdmin(user._id, user.admin) }}>Make Admin</Button>
                                                )
                                            } else {
                                                return (
                                                    <Button size="xs" className="btn btn-warning shadow" onClick={() => { setAdmin(user._id, user.admin) }}>Remove Admin Status</Button>
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
                                                            <p><strong>Monthly Budget:</strong> {user[i].budgetAmount}</p>
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
                                                    <Button style={{ marginLeft: "-17", width: "22px", height: "22px" }} key={i} size="xs" variant="info" className="mb-1 shadow" onClick={() => { setToggle(!toggle); setUserIndex(i) }}  >{buttonToggle(toggle)}</Button>
                                                    <div className="bg-light ms-auto "><strong>{user.firstname} {user.lastname}</strong></div>
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
                    <Container className="mt-2" >
                        <Stack direction="horizontal" gap={2}>
                            <h3 id="myStore" className="mx-auto ms-auto">My Store </h3>
                            <Button style={{ marginLeft: "-17", width: "22px", height: "22px" }} size="xs" variant="info" className="mb-1 shadow mt-3" onClick={() => { height === 0 ? setHeight("auto") : setHeight(0) }}  >{buttonToggle(height)}</Button>
                        </Stack>
                    </Container>
                    <hr />
                    <p className="text-center font-italic">View and edit store Items</p>
                    <AnimateHeight
                        id='example-panel'
                        aria-hidden="false"
                        duration={500}
                        height={height} // see props documentation below
                    >
                        <Container className="borderRound shadow limitHeightSmall text-center" >
                            <div className=''>
                                <Stack style={{ height: 25 }} className=" pt-3 row sticky-top border bgwhite" direction="horizontal">

                                    <p style={{ width: "100px" }} className="col-xs-3 bold mx-3 raleway">Image</p>
                                    <p className="col-xs-4 bold raleway">Item</p>
                                    <p className="col-sm-4 hidden-xs bold raleway">Description</p>
                                    <p className="col-xs-3 bold raleway">Price</p>
                                </Stack>

                                {sorted.map((prize, i) => {

                                    function deletePrize(prize) {
                                        let text = `Are you sure you want to delete ${prize.title}?`;;
                                        if (window.confirm(text)) {
                                            const storage = getStorage();
                                            var prizeRef = ref(storage, prize.image);

                                            // Delete the file
                                            deleteObject(prizeRef).then(() => {
                                                // File deleted successfully
                                            }).catch((error) => {
                                                // Uh-oh, an error occurred!
                                            });

                                            fetch(`https://crewcoin.herokuapp.com/store/${prize._id}`, {
                                                method: "DELETE",
                                                headers: {
                                                    authorization: `bearer ${token}`,
                                                    credentials: "same-origin",
                                                    Accept: "application/json",
                                                    "Content-Type": "application/json",
                                                    mode: "cors"
                                                },
                                                body: JSON.stringify({
                                                    "prizeId": prize._id
                                                }),
                                            })

                                                .then(res => res.json())
                                                .then(res => {
                                                    if (res.success) {
                                                        alert("Prize Deleted")
                                                        window.location.reload()
                                                    } else {
                                                        alert("Something went wrong")
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                }
                                                );
                                        }
                                    }
                                    function updatePrize(prize) {



                                        fetch(`https://crewcoin.herokuapp.com/store/${prize._id}`, {
                                            method: "Put",
                                            headers: {
                                                authorization: `bearer ${token}`,
                                                credentials: "same-origin",
                                                Accept: "application/json",
                                                "Content-Type": "application/json",
                                                mode: "cors"
                                            },
                                            body: JSON.stringify({
                                                "title": editPrize.title,
                                                "description": editPrize.description,
                                                "cost": editPrize.cost,
                                            }),
                                        })

                                            .then(res => res.json())
                                            .then(res => {
                                                if (res.success) {
                                                    alert("Prize Updated")
                                                    window.location.reload()
                                                } else {
                                                    alert("Something went wrong")
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            }
                                            );

                                    }

                                    return (
                                        <div key={i} className="">
                                            <Stack data-toggle="modal" data-target={`#storeModal${i}`} key={i} style={{ height: 100 }} className=" my-2 row border hover " direction="horizontal">

                                                <img style={{ width: "100px" }} src={prize.image} alt="prize"
                                                    className="col-xs-3 borderRound mx-3 shadow" />
                                                <p className="col-xs-4 bold raleway">{prize.title}  </p>
                                                <p className="hidden-xs col-sm-4 raleway">{prize.description.substring(0, 20) + "..."}</p>
                                                <p className="col-xs-3 raleway goldColor">{coin(prize.cost)}</p>
                                            </Stack>
                                            <div key={i} class="modal backdrop position-static modalStore fade zindex" id={`storeModal${i}`} tabindex="-1" role="dialog" data-backdrop="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div style={{ width: "75%", margin: "auto" }} class="modal-content">
                                                        <button type="button" className="close px-4 py-2" data-dismiss="modal" aria-label="Close">x</button>
                                                        <div class="modal-header">
                                                            <h4 class="modal-title text-center" id="exampleModalLabel">Edit Store Item</h4>
                                                        </div>
                                                        <div class="modal-body">
                                                            <img alt="crewcoingif" className="storeModalImg border2 shadow" src={prize.image} />
                                                            <h4 className="text-center goldColorSmall"><img alt="crewCoinGifSmall" className="crewCoinGifSmaller" src={'../img/coinIcon2.gif'} />{coin(prize.cost)}</h4>
                                                            <div className='form-group mb-5'>
                                                                <label htmlFor="title">Title:</label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control col'
                                                                    defaultValue={prize.title}

                                                                    name='title'
                                                                    required
                                                                    onChange={(value) => { setEditPrize({ ...editPrize, title: value.target.value }) }}
                                                                />

                                                                <label htmlFor="description">Description:</label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control col'
                                                                    defaultValue={prize.description}

                                                                    name='description'
                                                                    required
                                                                    onChange={(value) => { setEditPrize({ ...editPrize, description: value.target.value }) }}
                                                                />

                                                                <label htmlFor="cost">Cost:</label>
                                                                <input
                                                                    type='number'
                                                                    width='100px'
                                                                    className='form-control col-xs-4'
                                                                    defaultValue={prize.cost}

                                                                    name='cost'
                                                                    required
                                                                    onChange={(value) => { setEditPrize({ ...editPrize, cost: value.target.value }) }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class=" mx-auto mt-3 row">
                                                            <Button type="button" className="btn btn-danger shadow col-xs" data-dismiss="modal" onClick={() => deletePrize(prize)}>Delete</Button>
                                                            <Button onClick={() => updatePrize(prize)} type="button" className="btn btn-warning shadow col-xs mx-1 my-3">Save</Button>
                                                            <Button variant="secondary" type="button" className="btn-secondary shadow col-xs" data-dismiss="modal">Cancel</Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )


                                })}
                            </div>
                        </Container>
                    </AnimateHeight>
                    <Container className="mt-2" >
                        <Stack direction="horizontal">
                            <h3 id="myTransactions" className="mx-auto text-center ms-auto">Transaction History </h3>
                            <Button style={{ marginLeft: "-17", width: "22px", height: "22px" }} size="xs" variant="info" className="mb-1 shadow mt-3" onClick={() => { transHeight === 0 ? setTransHeight("auto") : setTransHeight(0) }}  >{buttonToggle(transHeight)}</Button>
                        </Stack>
                        <hr />
                        <p className="text-center font-italic">View transaction history</p>
                    </Container>
                    <AnimateHeight
                        id='example-panel'
                        aria-hidden="false"
                        duration={500}
                        height={transHeight} // see props documentation below
                    >
                        <Container className=" text-center mt-2 borderRound shadow limitHeightSmall" >
                            <PaginatedItems itemsPerPage={5} />
                        </Container>
                    </AnimateHeight>
                    <Container className="mt-2" >
                        <Stack direction="horizontal">
                            <h3 id="myPurchases" className="mx-auto text-center ms-auto">Organization Purchase History</h3>
                            <Button style={{ marginLeft: "-17", width: "22px", height: "22px" }} size="xs" variant="info" className="mb-1 shadow mt-3" onClick={() => { historyHeight === 0 ? setHistoryHeight("auto") : setHistoryHeight(0) }} >{buttonToggle(historyHeight)}</Button>
                        </Stack>
                        <hr />
                        <p className="text-center font-italic">View purchases from current users</p>
                    </Container>
                    <AnimateHeight
                        id='example-panel'
                        aria-hidden="false"
                        duration={500}
                        height={historyHeight} // see props documentation below
                    >
                        <Container className=" text-center mt-2 borderRound shadow limitHeightSmall mb-5" >
                            {purchaseHistory()}
                        </Container>
                    </AnimateHeight>
                    <div id='footer' className="border mt-5">
                        <div className='container text-center'>
                            <p>
                                &copy; 2022 Crew Coin. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        );
    }
    else {
        return (
            <PullToRefresh onRefresh={handleRefresh}>
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
            </PullToRefresh>
        )
    }
}
