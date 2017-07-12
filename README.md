## Npm command

### Run dev server
```
npm run dev
```

### Run server manually
```
npm run server
```

### Build script

```
npm run build //=> Production
npm run build:stg //=> Staging
```
### Run test

```
npm run test
npm run test-watch
```

### Run lint and flow (Need to maintain)
```
npm run lint
npm run flow
```

### Install packages
* Make sure `npm install` if package is updated.

```
npm install
```

### Reinstall uniyo redux
`can not find property request of undefined` means app can not load `uniyo-redux` properly. Just reinstall it.

```
rm -rf node_modules/uniyo-redux; npm install; npm run dev
```


## Branch naming convention

```
feature/[feature-name] //=> for initial commit
update/[feature-name]  //=> for update
fix/[feature-name]  //=> for fixing bug
```

## Commit message

Start from verb present tense so that easy to find out what was changed.

```
Add
Modify
Fix
Update
Delete
```

## Dependencies (need update)
[Dependencies](./dependencies.md)
