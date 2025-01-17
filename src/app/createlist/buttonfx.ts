export class ButtonFx {
  static addRippleEffect(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;


    button.classList.add('ripple');

    setTimeout(() => {
      button.classList.remove('ripple');
    }, 600);  
  }
}
