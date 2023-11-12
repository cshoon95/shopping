import { useCallback, useState } from 'react';
import { categories, products } from '@prisma';
import { useEffect } from 'react';
import Image from 'next/image';
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core';
import { FILTERS, TAKE, CATEGORY_MAP } from '@/constants/products';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce<string>(keyword);

  // const { data } = useQuery<{ items: products[] }>(
  //   [`/api/get-products?skip=${TAKE * (activePage - 1)}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`],
  //   () => fetch(`/api/get-products?skip=${TAKE * (activePage - 1)}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${keyword}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Network response was not ok: ${res.status}`);
  //       }
  //       return res.json();
  //     }),
  // )

  // const { data: categories } = useQuery<{ items: { id: number; name: string }[] }, unknown, { id: number; name: string }[]>(
  //   ['/api/get-categories'],
  //   () => fetch(`/api/get-categories`).then((res) => res.json())
  // );
  

	// useEffect(() => {
  //   fetch(`/api/get-categories`)
  //     .then((res) => res.json())
  //     .then((data) => setAllCategories(data.items))
  // }, []);
  
  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)));
  }, [selectedCategory, debouncedKeyword]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

	return (
    
		<div className='px-36 mt-36 mb-36'>
      <div class="mb-4">
        <Input placeholder='Your email' value={keyword} onChange={handleChange}></Input>
        
      </div>
      <div className='mb-4'>
        <Select value={selectedFilter} onChange={setSelectedFilter} data={FILTERS}></Select>
      </div>
      {categories && 
        <div className='mb-4'>
          <SegmentedControl
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              {label: 'ALL', value: '-1'},
              ...categories.map((category) => ({
                label: category.name, 
                value: String(category.id)
              }))
            ]}
            color="dakr"
          />
        </div>
      }

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
        </>
			))}
      <div className='w-full flex mt-5'>
        <Pagination value={activePage} onChange={setPage} total={total} />;
      </div>
    </div>
	);
};

export default Products;