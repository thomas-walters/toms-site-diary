
# Tom's Site Diary

A Site Diary is a critical document used on construction sites. It's a daily record of activities, events and occurrences on-site. This diary serves as a legal document and is essential for effective project management and accountability.

Tom's Site Diary features a List Page, a View Page and a Create Page. Each diary entry contains a Date, Description, Weather and Images.


## Demo

[Vercel Deployment](https://www.github.com/thomas-walters)


## Technical Choices

**Frontend:** ReactJs and NextJs

Personally comfortable using these and are both great choices for a modern, efficient and scalable web application.

**Styling:** TailwindCSS

I was originally going to use Material-UI given the time constraints, as it is what I am more comfortable using, however I decided to go with Tailwind after having used it recently and really enjoy the ease for mobile first design.

**Backend:** Supabase

My backend functionality is handled within Supabase, however I have included a sample endpoint using the NextJs Route Handlers

**Database:** Supabase

This was my first time using Supbase, so I decided to have a go at it after it was suggested. I found it super easy to setup and integrate into the project and thoroughly enjoyed using it.

**Image Upload**
UploadThing

Again, completly new to this.

**Deployment**
Vercel

Super easy to setup a deployment and most importantly, free!
## Running locally

To run this project locally, first create a ```.env.local``` file inside the project root and add the follow environment variables
```
xyz
```

Then, run the following commands in the terminal
```bash
  git clone https://github.com/iaincollins/nextjs-starter.git
  npm install
  npm run build
  npm run start
```


## Authors

- [@thomas-walters](https://www.github.com/thomas-walters)


## Approach

#### Planning
My first step was to read through the provided document and gather all of the requirements. This included things like required pages, required fields in forms, mobile optimisation etc.
#### Tech Stack Choice
Analysed which technologies would be best suited for the application, with my choices explained above.
#### Wireframing
Drafted some low-fidelity wireframes with pen and paper, showing the basics of each page. This was helpful for me considering the need for a responsive design given the mobile optimisation requirements of the application.
#### Database Schema
Planned what my database schema would look like. I decided to go with one 'diary_entries' table which had the following columns:
- database
- description
- weather
- images

I could have also had another table for images that had each image link in its own record, and then linked to a diary entry via a Foreign Key, but instead decided to store links in an array in the one table for simplicity.
#### Frontend Architecture Choices
Decided to take advantage of the new App Router in Next.js 13. Works similarly to the previous Pages Router, but with some slight differences. I considered using a SPA type approach, but decided against it, as I thought the use of a dynamic URL to access a specific diary entry could be useful for users. I wanted to show my ability to create and use components, which I have done so with the DiaryList component displayed on the home page. Ideally more of the application would be broken down into components.



## Future Improvements and Completion
- Better user feedback
- Add Entry as a Modal
- Pagination for the Diary Entries List endpoint and UI.
- Could possibly include some kind of caching for the diary entries so the endpoint does not have to be called every time the user navigates to a single entry and back to the main page.