'use client'

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { APIAlert } from "./api-alert";

interface APIListProps {
	entityName: string
	entityIdName: string
}


export const ApiList: React.FC<APIListProps> = (
	{
		entityName,
		entityIdName
	}
) => {
	const params = useParams();
	const origin = useOrigin();


	const baseURL = `${origin}/api/${params.storeId}`;

	  return (
	<>
		<APIAlert 
			title="GET" 
			variant="public"
			desc={`${baseURL}/${entityName}`}
		/>
	</>
  )
}