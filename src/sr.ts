export class Sr {
    private routes: {};
    private links: HTMLAnchorElement[];
    private outlet: HTMLElement;

    public constructor(routes: {}) {
        this.routes = routes;
        this.outlet = document.querySelector('[sr-outlet]');

        this.load();
        this.getLinks();
    }

    private load(): void {
        this.navigate(location.pathname);
    }

    private getLinks(): void {
        this.links = [...document.querySelectorAll('[sr-link]')] as HTMLAnchorElement[];
        this.links.forEach((link: HTMLAnchorElement): void => {
            const path: string = link.attributes['sr-link'].value;

            link.addEventListener('click', this.handleClick.bind(this));
            link.setAttribute('href', path);
        });
    }

    private handleClick(event: MouseEvent): void {
        event.preventDefault();
        this.navigate((event.target as HTMLAnchorElement).attributes['sr-link'].value);
    }

    private navigate(path: string): void {
        this.outlet.innerHTML = this.routes[path];
        this.getLinks();

        history.pushState({
            path: path
        }, null, path);
    }
};
