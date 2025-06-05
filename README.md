# ToDo Dashboard

This is a ToDo dashboard web app built with Next.js, Tailwind CSS, and MongoDB. It lets you manage meetings, agendas, and more. 

## Featurs
- Add, view, and manage meetings
- Responsive UI with Tailwind
- MongoDB for storing data

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/todo-dashboard.git
   ```
2. Install dependancies:
   ```bash
   npm install
   ```
3. Setup your MongoDB connection in `.env.local`:
   ```env
   MONGODB_URI=your-mongodb-uri-here
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

This app can be deployed to Vercel. Just push to your repo and connect it on Vercel dashbord.

## Tech Stack
- Next.js 14
- Tailwind CSS
- MongoDB

## Known Issues
- Sometimes the date format is weird (ex: 9/7/7002)
- No user auth yet

## Contributing
Pull requets are welcome! For major changes, please open an issue first.

## License
MIT
