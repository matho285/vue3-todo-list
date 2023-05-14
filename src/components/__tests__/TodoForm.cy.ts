import FormModal from '../FormModal.vue';

describe('FormModal', () => {
  it('renders properly for todo form', () => {
    cy.mount(FormModal, {
      slots: {
        title: 'Add new todo',
      },
    });
    cy.get('h2').should('have.text', 'Add new todo');
  });
});
