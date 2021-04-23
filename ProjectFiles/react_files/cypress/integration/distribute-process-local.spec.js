/// <reference types="cypress" />

describe("Local sharing process", () => {
    //* Local rent process.
    it("complete local rent process", () => {
        cy.visit("/Distribute/localremote/Rent");
        // Enter input room data page.
        cy.get("[data-testid=start_local").click().should("not.exist");

        // Enter room number.
        cy.get("[data-testid=input_rooms_amount]").clear().type("2");
        // Enter house cost.
        cy.get("[data-testid=input_house_cost]").clear().type("1000");
        // Continue to group info page and check store has updated.
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
        cy.contains("user 1").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter member 2.
        cy.get("[data-testid=input_group_member]").type("user 2");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 2").should("exist");
        cy.contains("user 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to valuations page and check store has updated.
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
        // Set valuations for member 2 and check store is correctly set, then continue.
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
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("deep.equal", [
                {
                    userGoodsArr: [
                        { Good: "Room 1", Value: "750" },
                        { Good: "Room 2", Value: "250" },
                    ],
                    username: "user 1",
                },
                {
                    userGoodsArr: [
                        { Good: "Room 1", Value: "300" },
                        { Good: "Room 2", Value: "700" },
                    ],
                    username: "user 2",
                },
            ]);
        cy.get("[data-testid=submit]").click();

        // Results should be correct.
        cy.contains("user 1")
            .find("span")
            .should("contain", "Room 1")
            .and("contain", "$525");
        cy.contains("user 2")
            .find("span")
            .should("contain", "Room 2")
            .and("contain", "$475");
    });

    //* Local custom goods process.
    it("complete local goods process", () => {
        cy.visit("/Distribute/localremote/Goods");
        // Enter input room data page.
        cy.get("[data-testid=start_local").click().should("not.exist");

        // Enter custom good 1.
        cy.get("[data-testid=input_custom_good_name]").type("custom good 1");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("custom good 1").should("exist");
        cy.contains("custom good 1").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter custom good 2.
        cy.get("[data-testid=input_custom_good_name]").type("custom good 2");
        cy.get("[data-testid=input_custom_good_estValue]").type("1500");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("custom good 2").should("exist");
        cy.contains("custom good 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter custom good 3.
        cy.get("[data-testid=input_custom_good_name]").type("custom good 3");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("custom good 3").should("exist");
        cy.contains("custom good 3").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to group info page and check store has updated.
        cy.get("[data-testid=submit]").click();
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("goodsArray")
            .should("deep.equal", [
                {
                    Good: "custom good 1",
                    estValue: "0",
                    Value: 0,
                },
                {
                    Good: "custom good 2",
                    estValue: "1500",
                    Value: 0,
                },
                {
                    Good: "custom good 3",
                    estValue: "0",
                    Value: 0,
                },
            ]);
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("totalValue")
            .should("equal", 1500);

        // Enter member 1.
        cy.get("[data-testid=input_group_member]").type("user 1");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 1").should("exist");
        cy.contains("user 1").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter member 2.
        cy.get("[data-testid=input_group_member]").type("user 2");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 2").should("exist");
        cy.contains("user 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to valuations page and check store has updated.
        cy.get("[data-testid=submit]").click().should("not.exist");
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("have.length", 2);

        // Set valuations for member 1 and continue.
        cy.contains("user 1").should("exist");
        cy.contains("custom good 1")
            .next()
            .as("range")
            .invoke("val", 1250)
            .trigger("input"); //! From trigger("change") workaround by https://github.com/cypress-io/cypress/issues/1570#issuecomment-380735686
        cy.contains("custom good 2")
            .next()
            .as("range")
            .invoke("val", 250)
            .trigger("input"); //!
        cy.contains("custom good 3")
            .next()
            .as("range")
            .invoke("val", 5)
            .trigger("input"); //!
        cy.get("[data-testid=submit]").click();
        // Set valuations for member 2 and continue.
        cy.contains("user 2").should("exist");
        cy.contains("custom good 1")
            .next()
            .as("range")
            .invoke("val", 500)
            .trigger("input"); //!
        cy.contains("custom good 2")
            .next()
            .as("range")
            .invoke("val", 1000)
            .trigger("input"); //!
        cy.contains("custom good 3")
            .next()
            .as("range")
            .invoke("val", 750)
            .trigger("input"); //!
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("deep.equal", [
                {
                    userGoodsArr: [
                        { Good: "custom good 1", estValue: "0", Value: "1250" },
                        {
                            Good: "custom good 2",
                            estValue: "1500",
                            Value: "250",
                        },
                        {
                            Good: "custom good 3",
                            estValue: "0",
                            Value: "5",
                        },
                    ],
                    username: "user 1",
                },
                {
                    userGoodsArr: [
                        { Good: "custom good 1", estValue: "0", Value: "500" },
                        {
                            Good: "custom good 2",
                            estValue: "1500",
                            Value: "1000",
                        },
                        {
                            Good: "custom good 3",
                            estValue: "0",
                            Value: "750",
                        },
                    ],
                    username: "user 2",
                },
            ]);
        cy.get("[data-testid=submit]").click();

        // Results should be correct.
        cy.contains("user 1")
            .find("span")
            .should("contain", "custom good 1")
            .and("contain", "custom good 3");
        cy.contains("user 2").find("span").should("contain", "custom good 2");
    });

    //* Local divorce process.
    it("complete local divorce process", () => {
        cy.visit("/Distribute/localremote/Divorce");
        // Enter input room data page.
        cy.get("[data-testid=start_local").click().should("not.exist");

        // Enter custom good 1.
        cy.get("[data-testid=input_custom_good_name]").type("asset 1");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("asset 1").should("exist");
        cy.contains("asset 1").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter custom good 2.
        cy.get("[data-testid=input_custom_good_name]").type("asset 2");
        cy.get("[data-testid=input_custom_good_estValue]").type("1000");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("asset 2").should("exist");
        cy.contains("asset 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter custom good 3.
        cy.get("[data-testid=input_custom_good_name]").type("asset 3");
        cy.get("[data-testid=add_custom_good]").click();
        cy.contains("asset 3").should("exist");
        cy.contains("asset 3").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to second page to input money available to share.
        cy.get("[data-testid=submit]").click();

        // Input money amount.
        cy.get("[data-testid=input_money_to_share]").clear().type("1000");
        // Continue to group info page and check store has updated.
        cy.get("[data-testid=submit]").click();
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("goodsArray")
            .should("deep.equal", [
                {
                    Good: "asset 1",
                    estValue: "0",
                    Value: 0,
                },
                {
                    Good: "asset 2",
                    estValue: "1000",
                    Value: 0,
                },
                {
                    Good: "asset 3",
                    estValue: "0",
                    Value: 0,
                },
            ]);
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGoodsInfo")
            .its("moneyAmount")
            .should("equal", 1000);

        // Enter member 1.
        cy.get("[data-testid=input_group_member]").type("user 1");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 1").should("exist");
        cy.contains("user 1").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Enter member 2.
        cy.get("[data-testid=input_group_member]").type("user 2");
        cy.get("[data-testid=add_group_member]").click();
        cy.contains("user 2").should("exist");
        cy.contains("user 2").within(() => {
            cy.contains("×").should("exist").and("be.visible"); // Delete buttom
        });
        // Continue to valuations page and check store has updated.
        cy.get("[data-testid=submit]").click().should("not.exist");
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("have.length", 2);

        // Set valuations for member 1 and continue.
        cy.contains("user 1").should("exist");
        cy.contains("asset 1")
            .next()
            .as("range")
            .invoke("val", 950)
            .trigger("input"); //! From trigger("change") workaround by https://github.com/cypress-io/cypress/issues/1570#issuecomment-380735686
        cy.contains("asset 2")
            .next()
            .as("range")
            .invoke("val", 1000)
            .trigger("input"); //!
        cy.contains("asset 3")
            .next()
            .as("range")
            .invoke("val", 50)
            .trigger("input"); //!
        cy.get("[data-testid=submit]").click();
        // Set valuations for member 2 and continue.
        cy.contains("user 2").should("exist");
        cy.contains("asset 1")
            .next()
            .as("range")
            .invoke("val", 700)
            .trigger("input"); //!
        cy.contains("asset 2")
            .next()
            .as("range")
            .invoke("val", 650)
            .trigger("input"); //!
        cy.contains("asset 3")
            .next()
            .as("range")
            .invoke("val", 650)
            .trigger("input"); //!
        cy.window()
            .its("store")
            .invoke("getState")
            .its("distGroupInfo")
            .its("userArray")
            .should("deep.equal", [
                {
                    userGoodsArr: [
                        { Good: "asset 1", estValue: "0", Value: "950" },
                        {
                            Good: "asset 2",
                            estValue: "1000",
                            Value: "1000",
                        },
                        {
                            Good: "asset 3",
                            estValue: "0",
                            Value: "50",
                        },
                    ],
                    username: "user 1",
                },
                {
                    userGoodsArr: [
                        { Good: "asset 1", estValue: "0", Value: "700" },
                        {
                            Good: "asset 2",
                            estValue: "1000",
                            Value: "650",
                        },
                        {
                            Good: "asset 3",
                            estValue: "0",
                            Value: "650",
                        },
                    ],
                    username: "user 2",
                },
            ]);
        cy.get("[data-testid=submit]").click();

        // Results should be correct.
        cy.contains("user 1").within(() => {
            cy.contains("asset 1").should("exist");
            cy.contains("550").should("exist");
        });
        cy.contains("user 2").within(() => {
            cy.contains("asset 2").should("exist");
            cy.contains("asset 3").should("exist");
            cy.contains("450").should("exist");
        });
    });
});
