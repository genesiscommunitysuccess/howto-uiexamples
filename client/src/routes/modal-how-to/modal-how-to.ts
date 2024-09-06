import { Connect } from '@genesislcap/foundation-comms';
import { Modal } from '@genesislcap/foundation-ui';
import { customElement, FoundationElement, observable } from '@genesislcap/web-core';
import { modalHowToStyles as styles } from './modal-how-to.styles';
import { modalHowToTemplate as template } from './modal-how-to.template';

const modalOpenCallbackTimeout = 2000;

@customElement({
  name: 'modal-how-to',
  template,
  styles,
})
export class ModalHowTo extends FoundationElement {
  @Connect connect!: Connect;

  modal: Modal;

  modalWithForm: Modal;

  modalRight: Modal;

  modalLeft: Modal;

  modalWithCallbacks: Modal;

  modalWithSlots: Modal;

  @observable entities: any[];

  openModal(): void {
    this.modal.show();
  }

  openModalWithForm(): void {
    this.modalWithForm.show();
  }

  handleModalFormSubmit(): void {
    this.modalWithForm.close();
  }

  openModalRight(): void {
    this.modalRight.show();
  }

  openModalLeft(): void {
    this.modalLeft.show();
  }

  openModalWithCallback(): void {
    this.modalWithCallbacks.show();
  }

  openModalWithSlots(): void {
    this.modalWithSlots.show();
  }

  async modalOpenCallback(): Promise<void> {
    setTimeout(async () => {
      const response = await this.connect.snapshot('ALL_ENTITYS');
      this.entities = response.ROW;
    }, modalOpenCallbackTimeout);
  }

  modalClosedCallback(): void {
    this.entities = null;
  }
}
