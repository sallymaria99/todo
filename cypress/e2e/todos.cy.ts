describe("Todo", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.visit("/todos");
  });

  it("should load the todo list", () => {
    cy.contains("hej").should("be.visible");
    cy.contains("tja").should("be.visible");
  });

  it("should add a new todo", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Testa Cypress");
    cy.get("button").contains("Add Todo").click();
    cy.contains("Testa Cypress").should("be.visible");
  });

  it("should delete a todo", () => {
    cy.contains("hej").parent().find("button").contains("Delete").click();
    cy.contains("hej").should("not.exist");
  });
});
