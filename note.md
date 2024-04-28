#cookies

Little bit of data that can be saved in user browser, sent from server,i.e hey browser when i am on this site, send me this reminder. used for remembering current user, shopping cart and so on.

Used to remember sessions/ state fullness

http requests are standalone, doesn't know what req was made before. However, with cookie we can define statefullness.

MVC: Model, view and controller. App is divided into 3 section. for every entity thetr is a model, which is displayed using view. Controller decides which view to display.

flash
npm i connect-flash

---

passports package
npm i passport passport-local passport-local-mongoose

Adds scalable authentication to your app
Passport local mongoose will add a username, hash and salt f"FIELD" to store username, hashed password and salt value.

Passport local mongoose automatically adds static methods to User model. ie: authenticate(), serializeUser(), register() and so on.


serialization means: how to store user into a session

These packages gives us methods that we would have to otherwise define ourself.

//authenticate using local strategy. redirect to /login on failure, flash failure message if failure
--
router.post("/login",passport.authenticate("local",{failureFlash:true, failureRedirect:"/login"}),(req.res)=>{
code block
})
--
if we reach code block, then it means somebody was authenticated
--

Therefore, make sure to update your /logout route in the routes/users.js code so it looks like this:

---
req.user contains information about the user. We don't have to look into session even though its stored in there.

req.login method enables login after registering
req.logout method enables logout

--
MVC: Model, view and controllers (rendering views and working with models)


---
const img = req.files.map(f => ({url: f.path, filename: f.filename}))
this gives us an array

campground.image.push(req.files.map(f => ({url: f.path, filename: f.filename}))) : this causes array to be pushed into another array. It wont pass our validation because, we predefined array to be "strings"

so to solve this, take the items of .map array and spread it into campground.image

campground.image.push(...img)