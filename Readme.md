
# carto-query

  CartoDB SQL Queries for the browser

## Example

```javascript
var conn = require('carto-query')({ username: 'dzajdband'});

conn.query(['SELECT * from {} limit {}', 'tweets_con_barrio', 20], function(err, data){
  console.log(err, data);
});
```

## Installation

  Install with [component(1)](http://component.io):

    $ component install danzajdband/carto-query

## API

### Connection(options)

- `options` (`Object`) 
  - `username` (`String`) cartodb username 
  - `host` (`string`) defaults to `cartodb.com`
  - `protocol` (`string`) defaults to `https`

### Connection#query(sql, meta, callback)

- `sql (`string|Array`) Accepts either a sql string or
an array with a [print.js formatted string](https://github.com/eldargab/print.js) followed by its parameters.
  - `meta` (`Object`) options meta params ['format', 'dp', 'api_key']
  - `callback` (`function`) 


## License

  MIT
