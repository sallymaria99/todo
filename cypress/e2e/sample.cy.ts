describe("Testning av test!!!", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("should load the todos", () => {
    cy.visit("/todos");
    cy.contains("hej").should("be.visible");
  });
});
