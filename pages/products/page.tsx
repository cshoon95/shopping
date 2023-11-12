import { useCallback, useState } from 'react';
import { products } from '@prisma';
import { useEffect } from 'react';
import Image from 'next/image';
import { Pagination } from '@mantine/core';

const TAKE = 9;

const Products = () => {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
	const [products, setProducts] = useState<products[]>([]);

	useEffect(() => {
    fetch(`/api/get-products-count`)
			.then((res) => res.json())
			.then((data) => setTotal(Math.ceil(data.items / TAKE)))

		fetch(`/api/get-products?skip=0&take=${TAKE}`)
			.then((res) => res.json())
			.then((data) => setProducts(data.items))
	}, []);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);

    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
			.then((res) => res.json())
			.then((data) => setProducts(data.items))
	}, [activePage]);

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
      <div className='w-full flex mt-5'>
        <Pagination value={activePage} onChange={setPage} total={total} />;
      </div>
    </div>
	);
};

export default Products;