# Geek Stash
![](/public/brand/logo.svg)

## What is Geek Stash?
- Working on a frontend app, for your favourite tvshow, but just can't find the right API to get started quick?
- Geek Stash has you covered. Login to the geekstash dashboard, and create the API for that franchise or choose from the existing ones, and get data in JSON format, with just a few clicks.

## How to use Geek Stash?
Documentation in dev.

### Authentication
![image](https://user-images.githubusercontent.com/58218526/214128410-f2f5db68-9e38-423b-b41b-663fce1bcde7.png)
- Google requires authentication, and is still underway.

### API Keys
![image](https://user-images.githubusercontent.com/58218526/214128819-6577a025-a5a3-4e29-a20e-31d627931789.png)
- generate api keys, to use the geek stash api.

### Add Your Creations
![image](https://user-images.githubusercontent.com/58218526/214129229-bc537d68-6694-4a9f-a1bf-88dba9fe3631.png)

- Click on new creations if you want to add a new franchise or choose from the existing ones:
![image](https://user-images.githubusercontent.com/58218526/214129762-53f54002-6631-4bf0-9bff-5366c1c233bb.png)
![image](https://user-images.githubusercontent.com/58218526/214129880-06b81e6c-dba9-4b46-906d-380313be09a0.png)

- you can then choose an entity you want to work with, e.g character
![image](https://user-images.githubusercontent.com/58218526/214130071-db83b4c1-1252-4c7c-ba73-e94f20eaeedb.png)
- you can enter the details of the character
![image](https://user-images.githubusercontent.com/58218526/214134434-0c11c88f-7502-4850-90dc-f1bbc38970a4.png)
- once you are done working on your characters you can publish them.
![image](https://user-images.githubusercontent.com/58218526/214134784-65ccb479-9c32-4b2f-af57-61f8dc5d9574.png)

### The API
- all requests need to be made through the following endpoint ``https://geek-stash.doncodes.xyz/api/data/get``
- the endpoint can optionally receive the following query parameters
```ts
interface IQueryParams {
  type: 'character' | 'franchise' | 'gadget' | 'place' | 'species' | 'fights',
  id: string,
  start: string // will get parsed to number,
  size: string // will get parsed to number
 }
```
- you will also need to provide, your api key, (**which can be found on your dashboard**) as an authorization header for the request.


### You can then monitor the requests made on the usage page.
![image](https://user-images.githubusercontent.com/58218526/214136308-3f435788-5408-4143-898f-69edf2ab9d5a.png)




## Disclaimer
Still under development. So, don't start using it in production, yet. 
There is still a lot that needs to be fine tuned. But the basic mvp is complete.

## Hope you enjoy using it.
