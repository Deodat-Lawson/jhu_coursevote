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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="m-2">
            <img
              src={image.url}
              alt="mock"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        ))}


      Hello, development in progress!
      </div>
    </main>
  );
}
