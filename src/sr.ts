export class Sr {
    private path: string;
    private routes: {};
    private links: HTMLAnchorElement[];
    private outlet: HTMLElement;

    public constructor(routes: {}) {
        this.routes = routes;
        this.outlet = document.querySelector('[sr-outlet]');

        this.link();
        this.catch();
    }

    private catch(): void {}

    private link(): void {
        this.links = [...document.querySelectorAll<HTMLAnchorElement>('[sr-link]')];
        this.links.forEach((link: HTMLAnchorElement): void => {
            link.addEventListener('click', this.navigate.bind(this));
            link.setAttribute('href', link.attributes['sr-link'].value);
        });
    }

    private navigate(event: MouseEvent): void {
        event.preventDefault();

        this.path = (event.target as HTMLElement).attributes['sr-link'].value;
        this.outlet.innerHTML = this.routes[this.path];
        this.link();

        history.pushState({
            path: this.path
        }, null, this.path);
    }
};
