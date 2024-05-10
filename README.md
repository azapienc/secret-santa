# Hi, this is my secret santa for Bettercloud

## how to check it
I deployed this app to https://secret-santa-weld.vercel.app and it's already connected with the firestore database, please let me know if there is any issue when testing.

To run it locally please
- clone the repository
- install the dependencies npm install
- set the .env file with the database variables, I'll share them in the email in case you need them
- npm run start
- Try to put any id, you should see a warning indicating that secret santa does not exists.
- Try with **friends**, that is the only secret santa stored in the database.
- Once in, please note that the members are divided by Apartment (it can be sub sets of a family though)
- Click on Sort it! and see the results

## Intented design
- This React app was designed to be connected with a firestore database
- It is using react-router for managin the routes
- Uses redux to manage the state of the application
- Also uses additional dependencies like redux-persist so you can reload the page and the state will remain
- My initial intention was to be able to register new families and members, unfortunatelly I ran out of time to do so (might see some remains of that code), however, it is fetching the existing records from there.
- Unfortunatelly I did not have much time to do unit testint either.
- Please let me know if you need me to populate the database with more records.

### Thanks for you time!
