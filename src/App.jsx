import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [password, setPassword] = useState("");

  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  const generatePassword = useCallback(()=>{
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%?&';
    let chars = letters;

    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    let newPassword = '';

    for (let i = 0; i < length; i++) {
      newPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(newPassword);
    setIsCopied(false);
    inputRef.current.focus();
  }, [length, includeNumbers, includeSpecialChars, setPassword])

  useEffect(()=>{generatePassword()}, [length, includeNumbers, includeSpecialChars, setPassword])

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    
    inputRef.current?.select();
    
    setIsCopied(true);
    if(copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);

    copyTimeoutRef.current = setTimeout(()=>{
      setIsCopied(false);
    }, 2000)
  }, [password]);

   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Password Generator</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Generated Password</label>
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-3 border border-gray-300 rounded focus:outline-none text-center text-xl focus:ring focus:border-blue-300"
            ref={inputRef}
          />
        </div>
        <div className="mb-4 flex justify-between items-center">
          <label className="block text-gray-700">Password Length</label>
          <span className="text-gray-700">{length}</span>
        </div>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full mb-4"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Numbers</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Special Characters</label>
        </div>
        <div className="flex justify-between">
          <button
            onClick={generatePassword}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full mr-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Re-Generate
          </button>
          <button
            onClick={copyToClipboard}
            className={`p-3 rounded w-full ml-2 transition duration-300 ease-in-out transform hover:scale-105 ${
              isCopied ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isCopied ? 'Copied!': 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
