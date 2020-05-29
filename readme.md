# my-state-api

Simple rest API build in node with typescript. Serve Malaysia states and federal territories
basic informations.

### Example
All available states & federal territories
[https://my-state.smsafuan.com/state/1](https://my-state.smsafuan.com/state)

```javascript
fetch('https://my-state.smsafuan.com/state')
                .then(res => res.json())
                .then(json => console.log(json))

            /* Output */
            {
                "success": 1,
                "data": [
                  {
                    "id": 1,
                    "name": "Perlis"
                  },
                  {
                    "id": 2,
                    "name": "Kedah"
                  },
                  {
                    "id": 3,
                    "name": "Perak"
                  },
            ...
```

Single state or federal territories informations
[https://my-state.smsafuan.com/state/1](https://my-state.smsafuan.com/state/1)
```javascript
fetch('https://my-state.smsafuan.com/state/1')
                .then(res => res.json())
                .then(json => console.log(json))
                
/* Output */
            {
                "success": 1,
                "data": {
                  "id": 1,
                  "name": "Perlis",
                  "capital": "Kangar",
                  "royal_capital": "Arau",
                  "area": 819,
                  "population": 254400,
                  "state_flag": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Perlis.svg",
                  "state_website": "http://www.perlis.gov.my/",
                  "wikipedia_page": "https://en.wikipedia.org/wiki/Perlis"
                }
            }


```


### License
----
MIT

