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


	const baseURL = `${origin}/api/${params.storeId}`;

	  return (
	<>
		<APIAlert 
			title="GET" 
			variant="public"
			desc={`${baseURL}/${entityName}`}
		/>
		<APIAlert 
			title="GET" 
			variant="public"
			desc={`${baseURL}/${entityName}/{${entityIdName}}`}
		/>
		<APIAlert 
			title="POST" 
			variant="admin"
			desc={`${baseURL}/${entityName}`}
		/>
		<APIAlert 
			title="PATCH" 
			variant="admin"
			desc={`${baseURL}/${entityName}/{${entityIdName}}`}
		/>
		<APIAlert 
			title="DELETE" 
			variant="admin"
			desc={`${baseURL}/${entityName}/{${entityIdName}}`}
		/>
	</>
  )
}