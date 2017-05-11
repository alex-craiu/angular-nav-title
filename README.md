Simple straightforward page navigation titles.

This module requires [Angular 2 router](https://angular.io/docs/ts/latest/guide/router.html).

## Installation

```bash
$ npm install --save angular-nav-title
```

## Usage

1. Import the module

```ts
import { NavTitleModule } from 'angular-nav-title';

@NgModule({
    ...
    imports: [NavTitleModule]
    ...
});
```

2. Add the `navTitle` param to your route's `data`:

```ts
...
const routes: Routes = [
    {
        path: '',
        component: ArticlesComponent,
        data: { navTitle: 'Articles' },
        children: [
            { path: '', component: ArticleListComponent, data: { navTitle: 'List' } }
        ]
    }
];
...
```

3. Insert the `NavTitleComponent` selector into `app.component.html`:

```html
<nav-title></nav-title>
```
If `navTitle` isn't specified it won't render on screen. On title click, it navigates to the corresponding route.

## Additional properties

Change the title separator (default: '–'):

```html
<nav-title separator=">"></nav-title>
```

Change the param name (default: 'navTitle'):

```html
<nav-title dataParam="breadcrumb"></nav-title>
```