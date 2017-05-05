##Demo

To see `ngx-o-table` in action (head to `/demo`), a few steps are required:

- you need `Angular-CLI` v1.0 or later (`npm install -g @angular/cli`)
- from the `demo` folder, run `npm install` 
- then start `ng serve` 

You might use `ng serve --proxy-config proxy.conf.json` to get rid of the Same-origin policy.

`proxy.conf.json` could look like this:
```
{
    "/V3/*": {
    "target": "http://services.odata.org",
    "secure": false,
    "changeOrigin": true
  }
}