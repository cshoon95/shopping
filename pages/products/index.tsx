import { useCallback, useState } from 'react';
import { products } from '@prisma';
import { useEffect } from 'react';
import Image from 'next/image';

const TAKE = 9;

const Products = () => {
	const [skip, setSkip] = useState(0);
	const [products, setProducts] = useState<products[]>([]);

	useEffect(() => {
		fetch(`/api/get-products?skip=0&take=${TAKE}`)
			.then((res) => res.json())
			.then((data) => setProducts(data.items))
	}, []);

  const getProducts = useCallback(() => {
    const next = skip + TAKE;
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
			.then((res) => res.json())
			.then((data) => {
        const list = products.concat(data.items);
        setProducts(list);
      })
    setSkip(next);
  }, [skip, products]);

	return (
		<div className='px-36 mt-36 mb-36'>
			{products && products.map((item) => (
        <>
				<div 
					className="grid grid-cols-3 gap-5"
					key={item.id}
				>
					<Image 
						src={item.image_url ?? ''} 
            width={300} 
            height={300} 
            alt={item.name}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

          />
				</div>
        <div>
          <span>{item.name}</span>
          <span>{item.price.toLocaleString('ko-KR')}원</span>
        </div>
        <span className="text-zinc-400">
          {item.category_id === 1 && '의류'}
        </span>
        </>
			))}

      <button 
        className='w-full rounded mt-20 bg-zinc-200 p-4'
        onClick={getProducts}
      >더보기</button>
		</div>
	);
};

export default Products;