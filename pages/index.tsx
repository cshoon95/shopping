import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<{
    id: string; 
    name: string;
    createdAt: string;
  }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 입력해주세요.');
      return;
    }

    fetch(`/api/get-items`)
    .then(res => res.json())
    .then(data => setProducts(data.items));
  }
  
  useEffect(() => {
    fetch('/api/get-products')
    .then(res => res.json())
    .then(data => setProducts(data.items))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>

        <input ref={inputRef} type="text" placeholder='name'/>
        <button onClick={handleClick}>add Clothes</button>
    
        <div>
          <p>Product List</p>
          {products && products.map((item)=>(
            <div key={item.id}>{item.name}<span>{item.createdAt}</span></div>
          ))}
        </div>
    </main>
  )
}
