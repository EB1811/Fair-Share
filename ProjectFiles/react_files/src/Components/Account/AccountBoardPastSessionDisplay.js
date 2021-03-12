import React from "react";

// Bootstrap Components
import Card from "react-bootstrap/Card";

const AccountBoardPastSessionDisplay = ({ session, uid }) => {
    return (
        <Card
            style={{
                color: "#000",
                textAlign: "left",
            }}
            className='mt-2'
        >
            <Card.Body>
                <div className='text-muted'>
                    Group: {session.group.map((user) => user.username + ", ")}
                </div>
                <hr />
                <div className='text-muted'>
                    {session.type === "Rent" ? (
                        <div>
                            <div>Number of rooms: {session.goods.length}</div>
                            <div>Total house cost: ${session.totalCost}</div>
                        </div>
                    ) : (
                        <span>
                            Goods:{" "}
                            {session.goods.map((good) => good.Good + ", ")}
                        </span>
                    )}
                </div>
            </Card.Body>
            <Card.Footer>
                <strong className='text-muted'>
                    Your allocation was:{" "}
                    {session.type === "Rent"
                        ? session.allocations[uid].room +
                          " at $" +
                          session.allocations[uid].price
                        : session.allocations[uid].goods}
                </strong>
            </Card.Footer>
        </Card>
    );
};

export default AccountBoardPastSessionDisplay;
