/// <reference types="cypress" />

describe("Local sharing process", () => {
    /*
    beforeEach(() => {
        cy.visit("/Distribute/localremote/Rent");
    });
    */

    // Error message on empty group.
    /*
    it("gives an error when group is empty", () => {
        cy.window().its("store").invoke("dispatch", {
            type: "UPDATE_MONEY_TO_SHARE",
            moneyAmount: 100,
        });

        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("moneyAmount")
            .should("equal", 100);
    });
    */

    // Local rent process up to interacting with api.
    it("Input house and group info, and their everybody's valuations correctly", () => {
        cy.visit("/Distribute/localremote/Rent");

        // Enter input room data page.
        cy.get("[data-testid=start_local").click().should("not.exist");
        // Enter room number.
        cy.get("[data-testid=input_rooms_amount]").clear().type("2");
        // Enter house cost.
        cy.get("[data-testid=input_house_cost]").clear().type("1000");
        // Continue to group info page.
        cy.get("[data-testid=submit").click().should("not.exist");
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("goodsArray")
            .should("have.length", 2);
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("totalValue")
            .should("equal", "1000");

        // Enter member 1.
        cy.get("[data-testid=input_group_member]").type("user 1");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 1").should("exist");
        // Enter member 2.
        cy.get("[data-testid=input_group_member]").type("user 2");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 2").should("exist");
        // Continue to valuations page.
        cy.get("[data-testid=submit]").click().should("not.exist");
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("have.length", 2);

        // Set valuations for member 1 and continue.
        cy.contains("user 1").should("exist");
        cy.contains("Room 1")
            .next()
            .as("range")
            .invoke("val", 750)
            .trigger("input"); //! From trigger("change") workaround by https://github.com/cypress-io/cypress/issues/1570#issuecomment-380735686
        cy.contains("Room 2")
            .next()
            .as("range")
            .invoke("val", 250)
            .trigger("input"); //!
        cy.get("[data-testid=submit]").click();
        // Set valuations for member 2 and check state.
        cy.contains("user 2").should("exist");
        cy.contains("Room 1")
            .next()
            .as("range")
            .invoke("val", 300)
            .trigger("input"); //!
        cy.contains("Room 2")
            .next()
            .as("range")
            .invoke("val", 700)
            .trigger("input"); //!
        // Shoule be true to pass to api.
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("deep.equal", [
                {
                    userEmail: null,
                    userGoodsArr: [
                        { Good: "Room 1", Value: "750" },
                        { Good: "Room 2", Value: "250" },
                    ],
                    username: "user 1",
                },
                {
                    userEmail: null,
                    userGoodsArr: [
                        { Good: "Room 1", Value: "300" },
                        { Good: "Room 2", Value: "700" },
                    ],
                    username: "user 2",
                },
            ]);
    });
});
