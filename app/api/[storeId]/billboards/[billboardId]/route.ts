import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(
	_req: Request,
	{ params }: { params: { billboardId: string } }
  ) {
	try {
  
	  if (!params.billboardId) {
		return new NextResponse("Billboard ID is required", { status: 400 })
	  }
  
	  const billboard = await prismadb.billboard.findUnique({
		where: {
		  id: params.billboardId,
		},
	  })
  
	  return NextResponse.json(billboard, { status: 200 })
	} catch (error) {
	  console.log("BILLBOARD GET ERROR: ", error)
	  return new NextResponse("Internal Server Error", { status: 500 })
	}
  }



export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { label, imageUrl } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
		imageUrl
      },
    })

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Store not found", { status: 404 })
    }

    return NextResponse.json(billboard, { status: 200 })
  } catch (error) {
    console.log("BILLBOARD PATCH ERROR: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

	const storeByUserId = await prismadb.store.findFirst({
		where: {
		  id: params.storeId,
		  userId,
		},
	  })
  
	  if (!storeByUserId) {
		return new NextResponse("Store not found", { status: 404 })
	  }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    })

    return NextResponse.json(billboard, { status: 200 })
  } catch (error) {
    console.log("BILLBOARD DELETE ERROR: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}



