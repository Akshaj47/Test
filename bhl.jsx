import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function BFHLFrontend() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Must include 'data' array.");
      }
      
      const response = await fetch("YOUR_BACKEND_URL/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const result = await response.json();
      setResponseData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">BFHL Frontend</h1>
      <Input 
        placeholder='Enter JSON input' 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        className='w-full max-w-lg mb-2'
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {responseData && (
        <Card className="mt-4 p-4 w-full max-w-lg">
          <CardContent>
            <Select 
              multiple 
              onValueChange={(values) => setSelectedFilters(values)}
              placeholder='Select Data to Display'>
              <SelectItem value='numbers'>Numbers</SelectItem>
              <SelectItem value='alphabets'>Alphabets</SelectItem>
              <SelectItem value='highest_alphabet'>Highest Alphabet</SelectItem>
            </Select>
            <div className="mt-4">
              {selectedFilters.map(filter => (
                <p key={filter} className="mt-2 font-semibold">
                  {filter}: {JSON.stringify(responseData[filter])}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
