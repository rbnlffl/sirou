export default class Sirou {
    private routes: {};
    private links: HTMLAnchorElement[];
    private outlet: HTMLElement;

    public constructor(routes: {}) {
        this.routes = routes;
        this.outlet = document.querySelector('[sirou-outlet]');

        this.load();
        this.getLinks();
        this.setListeners();
    }

    private load(): void {
        this.navigate(location.pathname);
    }

    private getLinks(): void {
        this.links = [...document.querySelectorAll('[sirou-link]')] as HTMLAnchorElement[];
    }

    private setListeners(): void {
        this.links.forEach((link: HTMLAnchorElement): void => {
            const path: string = link.attributes['sirou-link'].value;

            link.addEventListener('click', this.handleClick.bind(this));
            link.setAttribute('href', path);
        });

        window.addEventListener('popstate', this.handlePopstate.bind(this));
    }

    private handleClick(event: MouseEvent): void {
        event.preventDefault();
        this.navigate((event.target as HTMLAnchorElement).attributes['sirou-link'].value);
    }

    private handlePopstate(event: PopStateEvent): void {
        event.preventDefault();
        this.navigate(event.state.path);
    }

    private navigate(path: string): void {
        this.outlet.innerHTML = this.routes[path];
        this.getLinks();

        history.pushState({
            path: path
        }, null, path);
    }
};
