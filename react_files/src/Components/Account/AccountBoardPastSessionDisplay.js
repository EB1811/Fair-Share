import React from "react";

// Bootstrap Components
import Card from "react-bootstrap/Card";

const AccountBoardPastSessionDisplay = ({ session, uid }) => {
    //? Can refractor this to make adding new share types easier.
    return (
        <Card
            style={{
                color: "#000",
                textAlign: "left",
            }}
            className='mt-2'
        >
            <Card.Body>
                <div>
                    Type:{" "}
                    {session.type === "Divorce" ? "Finances" : session.type}
                </div>
                <hr />
                <div className='text-muted mb-2'>
                    Group: {session.group.map((user) => user.username + ", ")}
                </div>
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
                <div className='text-muted'>
                    {session.type === "Divorce" ? (
                        <div>Money: ${session.moneyAmount}</div>
                    ) : null}
                </div>
            </Card.Body>
            <Card.Footer>
                <strong className='text-muted blueText'>
                    Your allocation was:{" "}
                    {session.type === "Rent"
                        ? session.allocations[uid].room +
                          " at $" +
                          session.allocations[uid].price
                        : session.allocations[uid].goods}
                    {session.type === "Divorce" ? (
                        <div>+ ${session.allocations[uid].money}</div>
                    ) : null}
                </strong>
            </Card.Footer>
        </Card>
    );
};

export default AccountBoardPastSessionDisplay;
