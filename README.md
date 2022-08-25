![poop emoji with smile](https://imgur.com/undefined.png)

# Toot de Suite
Catering to all people, but aiming for inclusivity for those that are gender diverse, people with disabilities, people with health issues and/or parents. 

## Technologies Used
- Python
- Flask
- PostgreSQL
- SQLAlchemy
- React
- JS


## About the App
Toot de Suite is a play on the French, ‘tout de suite’. When you’re in need of a toilet, you should have access to it immediately!

Use this app to see nearby toilets, including opening hours, gender and accessibility.

Enter your location to see nearby toilets. Register and login to leave a review. [Email me](mailto:app.toot.de.suite@gmail.com) if you have any comments, queries or concerns – I’d love to hear from you.


## Motivations
I’m passionate about social causes and want to make life a little better, one insignificant app at a time. I hope this app will make someone's life a tiny bit better.

This app will give me a greater understanding of the above tech stack, whilst also contributing to my portfolio.


## User stories
- As a toilet user, I want to find clean toilets so that I am comfortable using public toilets.
- As a parent, I want to find toilets with baby change tables so that I can take my kiddo out in public.
- As a gender-diverse person, I want to find safe toilets, so that I don’t feel threatened when using public toilets.
- As a disabled person, I want to know if a public toilet offers accessible toilets, so I know where and when I can use a public toilet.
- As a person with health issues, I want to know where my closest toilet is, so that I can feel comfortable that I won’t be caught without a toilet.


## Problems & debugging
- Trying to use Google Maps API with multiple markers proved to be challenging, so I opted to use React-Leaflet instead
- React-Leaflet zoom to area function seems to be buggy, I'm yet to debug


## Toilet User Survey
I distributed a survey to find out potential user demographics – I wanted to know more about who would use the app and for what purpose.
Help me learn more by [completing the survey](https://forms.gle/zptdZZzbjsYh63UE7).

![age ranges, primarily 25-34 years old](https://imgur.com/Qa3MP2w.png)

![address, primarily live in suburban areas](https://imgur.com/jzwCGhR.png)

![approx 7% of respondents are gender diverse](https://imgur.com/etOQniI.png) 

![approx 3% of respondents require accessible toilet](https://imgur.com/wWM08Mr.png)

![approx 17% of respondents require a parent room or change table](https://imgur.com/dB2mcb7.png)


## Data Structures
![ERD diagram: data structure, users to reviews to toots](https://imgur.com/a/7KIk9r4.png)


## Wireframes
![wireframes: home, register, login, logout, reviews](https://imgur.com/a/53MpiNH.png)

## Further Reading & Resources
[Disability language and identities](https://flexforward.pressbooks.com/chapter/disability-language/)

[The Rodney Warmington Churchill Fellowship to increase accessibility to public toilets by researching taboos, design, policy and legal barriers](https://www.churchilltrust.com.au/project/the-rodney-warmington-churchill-fellowship-to-increase-accessibility-to-public-toilets-by-researching-taboos-design-policy-and-legal-barriers/)

[National Public Toilet Map](https://data.gov.au/dataset/ds-dga-553b3049-2b8b-46a2-95e6-640d7986a8c1/details)

[Disability Discrimination Act 1992](https://humanrights.gov.au/our-work/employers/disability-discrimination)

[Flush Toilet Finder](https://apps.apple.com/app/id955254528?fbclid=IwAR2FLIbJcyFjwaP-juY6q7eeiC-s9jM3mdE8txaYJD9H7TCghN4pauXdk5s)

[All Gender Toilets – We just want to go to the toilet!](https://accessinstitute.com.au/all-gender-toilets-we-just-want-to-go-to-the-toilet/)

[Wikicamps Australia App](https://accessinstitute.com.au/all-gender-toilets-we-just-want-to-go-to-the-toilet/)


## Stretch Goals
- Currently only using Australian data, it would be great to incorporate global resources.
    - Including a filter for paid toilets
- Incorporate ther users for toilets
    - Health issues including colostomy bag
    - Water refil station
    - Changing clothes
    - Injectables
- CRUD functionality: users are able to create, read, update and delete toilet locations.
- Search map function
    - Search/filter for specificities:
    - Gender
    - Baby change table
    - Disabled toilet
    - Sharps disposal
    - Key required
- Add fast-food restaurants as they are popular for a quick toilet stop, and most have accessible toilets and open long hours

