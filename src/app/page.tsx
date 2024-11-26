import Link from "next/link";

export default function HomePage() {

  const mockUrl = [
    "https://utfs.io/f/7CCGyytM9ORCCFJ2C5euiXWMRZ8pT590k71jgUAnoEwPJy2F",
  ];

  const mockImages = mockUrl.map((url, index) => ({
    id: index + 1,
    url,
  }));


  return (
    <main className="">
        <h1>Click to Punch NLP</h1>
        <h2>Click to Punch NLP is a tool to help you express your hatred towards NLP.</h2>

      Hello, development in progress!
    </main>
  );
}
