/// <reference types="cypress" />

// Need two users to test.
const user1_uid = "jL5u7VxtqbZrAut1plNMV8Z03042";
const user2_uid = "7L63JOlk8PO9Twuow814ZDdfH0M2";

describe("Remote sharing process", () => {
    beforeEach(() => {
        // Login as user 1.
        cy.visit("/");
        cy.login(user1_uid);
    });

    afterEach(() => {
        cy.visit("/");
        //cy.logout();
    });

    it("log in", () => {
        cy.visit("/Distribute/localremote/Rent");

        // Select remote and check if we are on the good info page.
        cy.get("[data-testid=start_remote").click().should("not.exist");
        cy.url().should("include", "/Distribute/GoodInfo/Remote/");

        // Enter room number.
        cy.get("[data-testid=input_rooms_amount]").clear().type("2");
        // Enter house cost.
        cy.get("[data-testid=input_house_cost]").clear().type("1000");
        // Submit goods list and check if we are on the group info page.
        cy.get("[data-testid=submit").click().should("not.exist");
        cy.url().should("include", "/Distribute/GroupInfo/Remote/");

        // Check if test user 1 has been automatically added to group.
        cy.contains("CypressTestUser1").should("exist");

        /*
        // Invite test user 2.
        cy.get("[data-testid=input_group_member]").type("user 2");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 2").should("exist");
        cy.contains("user 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to valuations page and check store has updated.
        cy.get("[data-testid=submit]").click().should("not.exist"); 
        */
    });
});
