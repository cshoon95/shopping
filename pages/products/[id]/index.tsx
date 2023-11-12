import Carousel from "nuka-carousel";
import Image from "next/image";
import CustomEditor from "@/components/Editor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default function Product() {
	const [index, setIndex] = useState(0);
	const router = useRouter();
	const { id: productId } = router.query;
	const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);

	useEffect(()=> {
		if (productId != null) {
			fetch(`/api/get-product?id=${productId}`)
				.then((res)=>res.json())
				.then((data)=> {
					if(data.items.contents) {
						setEditorState(
							EditorState.createWithContent(
								convertFromRaw(JSON.parse(data.items.contents))
							) 
						)
					} else {
						setEditorState(EditorState.createEmpty())
					}
				})
		}
	}, [productId])
  
  return (
    <>
    <Carousel animation="fade" autoplay wrapAround>
      {images.map(item => 
        <Image 
          key={item.original} 
          src={item.original} 
          width={1000} 
          height={600} 
          alt="image"
          layout="responsive"
        />)}
    </Carousel>
		<div style={{display: 'flext'}}>
			{images.map((item, idx) => (
				<div key={idx} onClick={() => setIndex(idx)}>
					<Image src={item.original} alt="image" width={100} height={100} />
				</div>
			))}
		</div>
		{editorState != null && (
			<CustomEditor editorState={editorState} readOnly
			/>)}
    </>
  )
}
