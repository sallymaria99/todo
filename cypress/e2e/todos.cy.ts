describe("Todo", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.visit("/");
  });

  it("should load the todo list", () => {
    cy.contains("hej").should("be.visible");
    cy.contains("tja").should("be.visible");
  });

  it("should add a new todo with a date", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Testa Cypress");
    cy.get('input[type="date"]').first().type("2024-08-20");
    cy.get("button").contains("Add Todo").click();
    cy.contains("2024-08-20: Testa Cypress").should("be.visible");
  });

  it("should delete a todo", () => {
    cy.contains("hej").parent().find("button").contains("Delete").click();
    cy.contains("hej").should("not.exist");
  });

  it("should edit a todo", () => {
    cy.contains("hej").parent().find("button").contains("Edit").click();
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Updated Todo");
      cy.contains("hej").parent().find("button").contains("Edit").click();
    });
    cy.contains("Updated Todo").should("be.visible");
  });

  it("should filter todos by date", () => {
    cy.get('input[type="date"]').last().type("2019-01-01");
    cy.get("button").contains("Filter by Date").click();
    cy.contains("hej").should("not.exist");
    cy.contains("tja").should("not.exist");
  });

  it("should show 'No todos found' when filtering by a date with no todos", () => {
    cy.get('input[type="date"]').last().type("2050-01-01");
    cy.get("button").contains("Filter by Date").click();

    cy.get("ul").should("not.exist");
    cy.contains("No todos found").should("be.visible");
  });
  /*  it("should mark a todo as completed", () => {
    cy.contains("hej").parent().find("input[type=checkbox]").check();
    cy.contains("hej")
      .parent()
      .find("span")
      .should("have.css", "text-decoration-line", "line-through");
  });

  it("should unmark a completed todo", () => {
    cy.contains("hej").parent().find("input[type=checkbox]").check();
    cy.contains("hej").parent().find("input[type=checkbox]").uncheck();
    cy.contains("hej")
      .parent()
      .find("span")
      .should("not.have.css", "text-decoration-line", "line-through");
  }); */
});
