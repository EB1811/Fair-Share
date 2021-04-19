/// <reference types="cypress" />

describe("Local group functions", () => {
    beforeEach(() => {
        cy.visit("/Distribute/localremote/Rent");
    });

    // Error message on empty group.
    //it("gives an error when group is empty", () => {

    //});
    // Click on local image.
    it("has correct state", () => {
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
});
