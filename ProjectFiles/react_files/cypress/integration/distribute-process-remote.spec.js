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
        cy.logout();
    });

    it("complete local rent process", () => {
        cy.visit("/Distribute/localremote/Rent");
        // Select remote and check if we are on the good info page. Store session's id.
        cy.get("[data-testid=start_remote]").click().should("not.exist");
        cy.url().should("include", "/Distribute/GoodInfo/Remote/");
        let sessionID = "";
        cy.url().then((url) => {
            const urlArray = url.split("/");
            sessionID = urlArray[urlArray.length - 1];
            console.log(sessionID);

            // Enter room number.
            cy.get("[data-testid=input_rooms_amount]").clear().type("2");
            // Enter house cost.
            cy.get("[data-testid=input_house_cost]").clear().type("1000");
            // Submit goods list and check if we are on the group info page.
            cy.get("[data-testid=submit]").click().should("not.exist");
            cy.url().should("include", "/Distribute/GroupInfo/Remote/");

            // Check if test user 1 has been automatically added to group.
            cy.contains("CypressTestUser1").should("exist");
            // Invite test user 2.
            cy.get("[data-testid=input_user_email]").type(
                "CypressTestUser2@fairshare-48f9f.com"
            );
            cy.get("[data-testid=add_group_member]").click();
            cy.contains("Invitation Sent").should("exist");

            // Logout and login as user 2.
            cy.visit("/");
            cy.logout();
            cy.login(user2_uid);
            // Check if there is a notification and accept it. Should be in group input page.
            cy.wait(5000);
            cy.get("[data-testid=accept_invitation]").should("exist").click();
            cy.wait(2000);
            cy.url().should("include", "/Distribute/GroupInfo/Remote/");
            // Go to next page and check if we are on valuations page.
            cy.wait(2000);
            cy.get("[data-testid=submit]").should("exist").click();
            cy.url().should("include", "/Distribute/Valuations/Remote/");

            // Set valuations and submit. Should be waiting for all users to finish.
            cy.contains("Room 1")
                .next()
                .as("range")
                .invoke("val", 300)
                .trigger("input"); //! From trigger("change") workaround by https://github.com/cypress-io/cypress/issues/1570#issuecomment-380735686
            cy.contains("Room 2")
                .next()
                .as("range")
                .invoke("val", 700)
                .trigger("input"); //!
            cy.get("[data-testid=submit]").click();
            cy.contains("Waiting for other players").should("exist");
            cy.wait(5000);

            // Logout and login as user 1.
            cy.visit("/");
            cy.logout();
            cy.login(user1_uid);
            cy.wait(5000);
            cy.visit("/Distribute/Valuations/Remote/" + sessionID);

            // Set valuations and submit. Should be waiting for all users to finish.
            cy.contains("Room 1")
                .next()
                .as("range")
                .invoke("val", 750)
                .trigger("input"); //!
            cy.contains("Room 2")
                .next()
                .as("range")
                .invoke("val", 250)
                .trigger("input"); //!
            cy.get("[data-testid=submit]").click();

            // Results should be correct.
            cy.get("[data-testid=result_card]").within(() => {
                cy.contains("Room 2 at $475").should("exist");
            });
        });
    });
});
