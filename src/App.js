// import logo from './assets/logo.png';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { SignOutButton, useUser } from '@clerk/clerk-react';

export default function App() {
  const { user } = useUser();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold inline-block mr-4">🎉 You’re signed in!</h1>
      {user && (
        <img
          src={user.imageUrl}
          alt={user.fullName || 'User avatar'}
          className="inline-block w-10 h-10 rounded-full mr-4 align-middle"
        />
      )}
      <SignOutButton>
        <button className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          Sign out
        </button>
      </SignOutButton>
    </div>
  );
}